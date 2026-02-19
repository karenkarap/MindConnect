import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import type { RegisterData, LoginData } from '../../types/authTypes';

export const registerUser = async ({ email, password, username }: RegisterData): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: username });
  return userCredential.user;
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
    console.log('Log-Out');
  } catch (error) {
    console.log(error);
  }
};

export const logInUser = async ({ email, password }: LoginData) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
