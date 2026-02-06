import { createUserWithEmailAndPassword, updateProfile, type User } from 'firebase/auth';
import { auth } from '../config/firebase';
import type { RegisterData } from '../types/authTypes';

export const registerUser = async ({
  email,
  password,
  username: displayName,
}: RegisterData): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return userCredential.user;
};
