import { useInfiniteQuery } from '@tanstack/react-query';
import { getPsychologists } from '../../services/api';
import type { FilterSort } from '../../types/psychologistsTypes';
import Container from '../../components/Container/Container';
import { useState } from 'react';
import PsychologistsGrid from '../../components/PsychologistsGrid/PsychologistsGrid';

const Psychologists = () => {
  const [filterSort, setFilterSort] = useState<FilterSort>('All');

  const { data, isLoading, fetchNextPage, error } = useInfiniteQuery({
    queryKey: ['psychologists', filterSort],
    queryFn: ({ pageParam }) => getPsychologists({ pageParam, filterSort }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  console.log('data: ', data?.pages);
  console.log('Error :', error);

  return (
    <section>
      <Container>
        {isLoading && <h2>Loading ...</h2>}
        <PsychologistsGrid />
        <button onClick={() => fetchNextPage()}>Load more</button>
      </Container>
    </section>
  );
};

export default Psychologists;
