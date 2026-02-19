import { useState } from 'react';
import Dropdown from '../../components/ui/Dropdown/Dropdown';
import { useAuthStore } from '../../store/authStore';
import type { FilterSort, Psychologist } from '../../types/psychologistsTypes';
import css from './Favorites.module.css';
import { useQuery } from '@tanstack/react-query';
import { getFavoritePsychologists } from '../../services/api/favorites';
import Container from '../../components/Container/Container';
import PsychologistsGrid from '../../components/PsychologistsGrid/PsychologistsGrid';
import useFavoriteMutation from '../../hooks/useFavoriteMutation';
import toast from 'react-hot-toast';

const Favorites = () => {
  const [filterSort, setFilterSort] = useState<FilterSort>('All');
  const user = useAuthStore((state) => state.user);
  const mutation = useFavoriteMutation();

  const { data, isLoading, isError } = useQuery<Psychologist[]>({
    queryKey: ['favoritePsychologists', user?.uid],
    queryFn: () => getFavoritePsychologists(user!.uid),
    enabled: !!user,
  });

  const handleFilter = (value: FilterSort) => {
    setFilterSort(value);
  };

  const handleToogleFavorite = (psychologistId: string) => {
    if (!user) {
      toast.error('Please login');
      return;
    }
    mutation.mutate(psychologistId);
  };

  return (
    <>
      {isLoading && (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {isError && (
        <div>
          <h2>Error</h2>
        </div>
      )}
      {data && data.length === 0 && (
        <div>
          <h2>No favorites</h2>
        </div>
      )}

      <section className={css.section}>
        <Container>
          <Dropdown value={filterSort} onFilter={handleFilter} />
          {data && data?.length > 0 && (
            <PsychologistsGrid
              psychologists={data}
              onFavorite={handleToogleFavorite}
              disabledButton={mutation.isPending}
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default Favorites;
