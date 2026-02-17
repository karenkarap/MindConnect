import type { Psychologist } from '../../types/psychologistsTypes';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import css from './PsychologistsGrid.module.css';

interface PsychologistsGridProps {
  psychologists: Psychologist[];
}

const PsychologistsGrid = ({ psychologists }: PsychologistsGridProps) => {
  return (
    <>
      <ul className={css.list}>
        {psychologists.map((psychologist) => (
          <PsychologistCard key={psychologist.id} psychologist={psychologist} />
        ))}
      </ul>
    </>
  );
};

export default PsychologistsGrid;
