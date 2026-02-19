import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { toggleFavorite } from '../services/api/favorites';

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (psychologistId: string) => {
      const userId = useAuthStore.getState().user?.uid;
      if (!userId) throw new Error('User not authenticated');
      return toggleFavorite(userId, psychologistId);
    },
    onError: (error) => {
      console.error('Error: ', error);
      toast.error('Something went wrong');
    },
    onSuccess: (data) => {
      const userId = useAuthStore.getState().user?.uid;
      if (!userId) return;
      queryClient.invalidateQueries({ queryKey: ['favoritePsychologists', userId] });
      queryClient.invalidateQueries({ queryKey: ['favoriteIds', userId] });
      if (data.status === 'added') toast.success('Added to favorites');
      if (data.status === 'removed') toast.success('Removed from favorites');
    },
  });
};

export default useFavoriteMutation;
