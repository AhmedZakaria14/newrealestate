'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';

export type UserRole = 'admin' | 'editor' | 'viewer';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  createdAt?: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  role: UserRole | null;
  loading: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          // Determine admin status
          const isPrimaryAdmin =
            currentUser.email === 'azeco44@gmail.com' ||
            currentUser.email?.endsWith('@hardgroup.sa');

          let assignedRole: UserRole = isPrimaryAdmin ? 'admin' : 'viewer';

          if (userDocSnap.exists()) {
            const data = userDocSnap.data() as UserProfile;
            assignedRole = isPrimaryAdmin ? 'admin' : (data.role || 'viewer');
          } else {
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || (currentUser.email?.split('@')[0] ?? 'User'),
              role: assignedRole,
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, newProfile, { merge: true });
          }

          setProfile({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || (currentUser.email?.split('@')[0] ?? 'User'),
            role: assignedRole,
          });
        } catch (err) {
          console.error('Error loading user profile:', err);
          setProfile({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || 'Staff',
            role: currentUser.email === 'azeco44@gmail.com' ? 'admin' : 'editor',
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      const userDocRef = doc(db, 'users', cred.user.uid);
      const isPrimary = email === 'azeco44@gmail.com' || email.endsWith('@hardgroup.sa');
      await setDoc(userDocRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: name || email.split('@')[0],
        role: isPrimary ? 'admin' : 'editor',
        createdAt: serverTimestamp(),
      });
    }
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const role = profile?.role || null;
  const isAdmin = role === 'admin' || user?.email === 'azeco44@gmail.com';
  const isStaff = isAdmin || role === 'editor';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        loading,
        isAdmin,
        isStaff,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
