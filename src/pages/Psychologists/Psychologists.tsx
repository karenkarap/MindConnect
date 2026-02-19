import { useInfiniteQuery } from '@tanstack/react-query';
import { getPsychologists } from '../../services/api/api';
import type { ApiResponse, FilterSort } from '../../types/psychologistsTypes';
import Container from '../../components/Container/Container';
import PsychologistsGrid from '../../components/PsychologistsGrid/PsychologistsGrid';
import css from './Psychologists.module.css';
import { useState } from 'react';
import type { DocumentSnapshot } from 'firebase/firestore';
import Dropdown from '../../components/ui/Dropdown/Dropdown';

const Psychologists = () => {
  const [filterSort, setFilterSort] = useState<FilterSort>('All');

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['psychologists', filterSort],
    queryFn: ({ pageParam }: { pageParam: DocumentSnapshot | null }) =>
      getPsychologists({ pageParam, filterSort }),
    initialPageParam: null as DocumentSnapshot | null,
    getNextPageParam: (lastPage: ApiResponse) => lastPage.nextCursor,
  });

  const handleFilter = (value: FilterSort) => {
    setFilterSort(value);
  };

  const allPsychologists = data?.pages.flatMap((item) => item.items) ?? [];

  return (
    <section className={css.section}>
      <Container>
        {isLoading && <h2>Loading ...</h2>}
        <Dropdown value={filterSort} onFilter={handleFilter} />
        {allPsychologists && <PsychologistsGrid psychologists={allPsychologists} />}
        <button onClick={() => fetchNextPage()} className={css.loadMoreBtn}>
          Load more
        </button>
      </Container>
    </section>
  );
};

export default Psychologists;
