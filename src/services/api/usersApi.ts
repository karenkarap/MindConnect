import type { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export const createUserDocument = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      email: user.email,
      createdAt: new Date(),
    });
  }
};
