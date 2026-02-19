import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuthStore } from '../../store/authStore';
import { createUserDocument } from './usersApi';

export const initAuthListener = () => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      await createUserDocument(user);
    }
    useAuthStore.getState().setUser(user);
  });
};
