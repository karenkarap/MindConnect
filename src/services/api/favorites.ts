import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

export const toggleFavorite = async (userId: string, psychologistId: string) => {
  const favoriteRef = doc(db, 'users', userId, 'favorites', psychologistId);

  const favoriteSnap = await getDoc(favoriteRef);

  if (favoriteSnap.exists()) {
    await deleteDoc(favoriteRef);
    return { status: 'removed' as const };
  } else {
    await setDoc(favoriteRef, { addedAt: serverTimestamp() });
    return { status: 'added' as const };
  }
};

export const getFavorites = async (userId: string) => {
  const favRef = collection(db, 'users', userId, 'favorites');

  const snapshot = await getDocs(favRef);
  return snapshot.docs;
};
