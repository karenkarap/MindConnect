import {
  ref,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
  orderByChild,
  endAt,
  startAt,
  get,
} from 'firebase/database';
import { db } from '../config/firebase';
import type { FilterSort, HttpResponsePsychologist } from '../types/psychologistsTypes';

interface GetPsychologists {
  pageParam: string | null;
  filterSort: FilterSort;
  limit?: number;
}

export const getPsychologists = async ({
  pageParam: lastKey,
  filterSort = 'All',
  limit = 3,
}: GetPsychologists) => {
  const dbRef = ref(db, 'psychologists');

  let queryDb;

  switch (filterSort) {
    case 'A-Z':
    case 'Z-A':
      queryDb = query(dbRef, orderByChild('name'));
      break;

    case 'Popular':
    case 'NotPopular':
      queryDb = query(dbRef, orderByChild('rating'));
      break;

    case '>170$':
      queryDb = query(dbRef, orderByChild('price_per_hour'), startAt(170));
      break;
    case '<170$':
      queryDb = query(dbRef, orderByChild('price_per_hour'), endAt(170));
      break;

    default:
      queryDb = query(dbRef, orderByKey());
      break;
  }

  if (lastKey) {
    queryDb = query(queryDb, limitToFirst(limit + 1), startAfter(lastKey));
  } else {
    queryDb = query(queryDb, limitToFirst(limit + 1));
  }

  const snapshot = await get(queryDb);

  if (!snapshot.exists()) {
    return { items: [], nextCursor: null };
  }

  const data = snapshot.val() as Record<string, HttpResponsePsychologist>;

  let items = Object.entries(data).map(([id, item]) => ({
    id,
    ...item,
  }));

  if (filterSort === 'NotPopular' || filterSort === 'Z-A') {
    items = items.reverse();
  }

  const hasMore = items.length > limit;
  items = items.slice(0, limit);
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return {
    items,
    nextCursor,
  };
};

// export const getPsychologists = async ({
//   pageParam,
//   filterSort,
//   limit = 3,
// }: GetPsychologists): Promise<ApiResponse> => {
//   const dbRef = ref(db, 'psychologists');
//   let dbQuery;

//   switch (filterSort) {
//     case 'A-Z':
//       dbQuery = query(dbRef, orderByChild('name') );
//       break;
//     case 'Z-A':
//       dbQuery = query(dbRef, orderByChild('name'));
//       break;
//     case '<170$':
//       dbQuery = query(dbRef, orderByChild('price_per_hour'), endAt(170));
//       break;
//     case '>170$':
//       dbQuery = query(dbRef, orderByChild('price_per_hour'), startAt(170));
//       break;
//     case 'Popular':
//       dbQuery = query(dbRef, orderByChild('rating'));
//       break;
//     case 'NotPopular':
//       dbQuery = query(dbRef, orderByChild('rating'));
//       break;
//     case 'All':
//     default:
//       dbQuery = query(dbRef, orderByKey());
//   }

//   dbQuery = query(dbQuery, limitToFirst(limit + 1));

//   if (pageParam) {
//     dbQuery = query(dbQuery, startAfter(pageParam));
//   }

//   const snapshot = await get(dbQuery);

//   if (!snapshot.exists()) {
//     return { items: [], nextCursor: null };
//   }

//   const data = snapshot.val() as Record<string, HttpResponsePsychologist>;

//   let items = Object.entries(data).map(([id, item]) => ({
//     id,
//     ...item,
//   }));

//   if (filterSort === 'NotPopular' || filterSort === 'Z-A') {
//     items = items.reverse();
//   }

//   const hasMore = items.length > limit;
//   const resultItems = items.slice(0, limit);
//   const nextCursor = hasMore ? resultItems[resultItems.length - 1].id : null;

//   return {
//     items: resultItems,
//     nextCursor,
//   };
// };

// export const getAllPsychologists = async (): Promise<Psychologist[]> => {
//   const snapshot = await get(ref(db, 'psychologists'));

//   if (!snapshot.exists()) return [];

//   const data = snapshot.val() as Record<string, HttpResponsePsychologist>;

//   return Object.entries(data).map(([id, item]) => ({
//     id,
//     ...item,
//   }));
// };
