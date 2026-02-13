import { useInfiniteQuery } from '@tanstack/react-query';
import { getPsychologists } from '../../services/api';
import type { FilterSort } from '../../types/psychologistsTypes';
import Container from '../../components/Container/Container';
import { useState } from 'react';
import PsychologistsGrid from '../../components/PsychologistsGrid/PsychologistsGrid';
import css from './Psychologists.module.css';

const Psychologists = () => {
  const [filterSort, setFilterSort] = useState<FilterSort>('All');

  const { data, isLoading, fetchNextPage, error } = useInfiniteQuery({
    queryKey: ['psychologists', filterSort],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getPsychologists({ pageParam, filterSort }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  console.log('Error :', error);
  const allPsychologists = data?.pages.flatMap((item) => item.items) ?? [];

  return (
    <section className={css.section}>
      <Container>
        {isLoading && <h2>Loading ...</h2>}
        {allPsychologists && <PsychologistsGrid psychologists={allPsychologists} />}
        <button onClick={() => fetchNextPage()} className={css.loadMoreBtn}>
          Load more
        </button>
      </Container>
    </section>
  );
};

export default Psychologists;
