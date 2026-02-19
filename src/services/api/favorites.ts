import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  documentId,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Psychologist } from '../../types/psychologistsTypes';

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

export const getFavoritePsychologists = async (userId: string) => {
  const favRef = collection(db, 'users', userId, 'favorites');

  const snapshot = await getDocs(favRef);

  const favoritesId = snapshot.docs.map((doc) => doc.id);

  if (favoritesId.length === 0) {
    return [];
  }

  const chunks: string[][] = [];

  for (let i = 0; i < favoritesId.length; i += 10) {
    chunks.push(favoritesId.slice(i, i + 10));
  }

  const dbRef = collection(db, 'psychologists');

  let psychologists: Psychologist[] = [];

  for (const chunk of chunks) {
    const q = query(dbRef, where(documentId(), 'in', chunk));
    const res = await getDocs(q);
    psychologists = [
      ...psychologists,
      ...res.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Psychologist, 'id'>),
      })),
    ];
  }

  return psychologists;
};

export const getFavoriteIds = async (userId: string): Promise<string[]> => {
  const favRef = collection(db, 'users', userId, 'favorites');

  const snapshot = await getDocs(favRef);

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => doc.id);
};
