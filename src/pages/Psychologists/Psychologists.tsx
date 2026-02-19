import { useInfiniteQuery } from '@tanstack/react-query';
import { getPsychologists } from '../../services/api/api';
import type { ApiResponse, FilterSort } from '../../types/psychologistsTypes';
import Container from '../../components/Container/Container';
import PsychologistsGrid from '../../components/PsychologistsGrid/PsychologistsGrid';
import css from './Psychologists.module.css';
import { useState } from 'react';
import type { DocumentSnapshot } from 'firebase/firestore';
import Dropdown from '../../components/ui/Dropdown/Dropdown';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import useFavoriteMutation from '../../hooks/useFavoriteMutation';

const Psychologists = () => {
  const [filterSort, setFilterSort] = useState<FilterSort>('All');
  const mutation = useFavoriteMutation();
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['psychologists', filterSort],
    queryFn: ({ pageParam }: { pageParam: DocumentSnapshot | null }) =>
      getPsychologists({ pageParam, filterSort }),
    initialPageParam: null as DocumentSnapshot | null,
    getNextPageParam: (lastPage: ApiResponse) => lastPage.nextCursor,
  });

  const handleToogleFavorite = (psychologistId: string) => {
    if (!user) {
      toast.error('Please login');
      return;
    }
    mutation.mutate(psychologistId);
  };

  const handleFilter = (value: FilterSort) => {
    setFilterSort(value);
  };

  const allPsychologists = data?.pages.flatMap((item) => item.items) ?? [];

  return (
    <section className={css.section}>
      <Container>
        <Dropdown value={filterSort} onFilter={handleFilter} />
        {allPsychologists && (
          <PsychologistsGrid
            psychologists={allPsychologists}
            onFavorite={handleToogleFavorite}
            disabledButton={mutation.isPending}
          />
        )}
        <button onClick={() => fetchNextPage()} className={css.loadMoreBtn} disabled={isLoading}>
          Load more
        </button>
      </Container>
    </section>
  );
};

export default Psychologists;
