import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { storage, db } from './firebase';

export interface StorageMediaItem {
  id?: string;
  name: string;
  url: string;
  storagePath: string;
  size: number;
  type: string;
  folder: string;
  uploader?: string;
  createdAt: any;
}

/**
 * Uploads a file to Firebase Storage and records the metadata in Firestore.
 */
export async function uploadFileToStorage(
  file: File,
  folder: string = 'uploads',
  uploaderEmail?: string,
  onProgress?: (progress: number) => void
): Promise<StorageMediaItem> {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${folder}/${timestamp}_${sanitizedName}`;
  const storageRef = ref(storage, storagePath);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error('Storage upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const mediaData: StorageMediaItem = {
            name: file.name,
            url: downloadUrl,
            storagePath,
            size: file.size,
            type: file.type || 'application/octet-stream',
            folder,
            uploader: uploaderEmail || 'admin',
            createdAt: serverTimestamp(),
          };

          // Save to Firestore 'media' collection for immediate persistent lookup
          const docRef = await addDoc(collection(db, 'media'), mediaData);
          resolve({ id: docRef.id, ...mediaData });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Deletes a file from Firebase Storage and deletes its Firestore record.
 */
export async function deleteStorageFile(mediaId: string, storagePath: string): Promise<void> {
  try {
    // 1. Delete from Firebase Storage
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef).catch((e) => {
      console.warn('File might already be deleted in Storage:', e);
    });

    // 2. Delete document from Firestore
    if (mediaId) {
      await deleteDoc(doc(db, 'media', mediaId));
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

/**
 * Subscribes to uploaded media items in real time.
 */
export function subscribeToMedia(callback: (items: StorageMediaItem[]) => void) {
  const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const items: StorageMediaItem[] = [];
    snapshot.forEach((d) => {
      items.push({ id: d.id, ...d.data() } as StorageMediaItem);
    });
    callback(items);
  }, (err) => {
    console.error('Error listening to media:', err);
  });
}

/**
 * Format bytes into human readable KB/MB
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
