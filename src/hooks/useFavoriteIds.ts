import { useQuery } from '@tanstack/react-query';
import { getFavoriteIds } from '../services/api/favorites';
import { useAuthStore } from '../store/authStore';

const useFavoriteIds = () => {
  const user = useAuthStore((state) => state.user);

  const { data: favoriteIds = [], isLoading } = useQuery({
    queryKey: ['favoriteIds', user?.uid],
    queryFn: () => getFavoriteIds(user!.uid),
    enabled: !!user,
  });

  const isFavorite = (psychologistId: string) => favoriteIds.includes(psychologistId);

  return { favoriteIds, isFavorite, isLoading };
};

export default useFavoriteIds;
