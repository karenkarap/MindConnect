import { db } from '../config/firebase';
import type { ApiResponse, FilterSort, Psychologist } from '../types/psychologistsTypes';
import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
} from 'firebase/firestore';

export interface GetPsychologists {
  pageParam: DocumentSnapshot | null;
  filterSort?: FilterSort;
  limit?: number;
}

export const getPsychologists = async ({
  pageParam: lastDoc,
  filterSort = 'All',
  limit: pageLimit = 3,
}: GetPsychologists): Promise<ApiResponse> => {
  const psychologistsRef = collection(db, 'psychologists');

  let q;

  switch (filterSort) {
    case 'A-Z':
      q = query(psychologistsRef, orderBy('name', 'asc'));
      break;

    case 'Z-A':
      q = query(psychologistsRef, orderBy('name', 'desc'));
      break;

    case 'Popular':
      q = query(psychologistsRef, orderBy('rating', 'desc'));
      break;

    case 'NotPopular':
      q = query(psychologistsRef, orderBy('rating', 'asc'));
      break;

    case '>170$':
      q = query(
        psychologistsRef,
        where('price_per_hour', '>', 170),
        orderBy('price_per_hour', 'asc')
      );
      break;

    case '<170$':
      q = query(
        psychologistsRef,
        where('price_per_hour', '<', 170),
        orderBy('price_per_hour', 'asc')
      );
      break;

    default:
      q = query(psychologistsRef, orderBy('name', 'asc'));
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageLimit + 1));
  } else {
    q = query(q, limit(pageLimit + 1));
  }

  const snapshot = await getDocs(q);

  const items = snapshot.docs.splice(0, pageLimit).map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Psychologist, 'id'>),
  }));

  const hasMore = snapshot.docs.length > pageLimit;
  const nextCursor = hasMore ? snapshot.docs[pageLimit - 1] : null;

  return {
    items,
    nextCursor,
  };
};
