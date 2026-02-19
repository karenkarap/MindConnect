import type { Psychologist } from '../../types/psychologistsTypes';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import css from './PsychologistsGrid.module.css';

interface PsychologistsGridProps {
  psychologists: Psychologist[];
  onFavorite: (psychologistId: string) => void;
  disabledButton: boolean;
}

const PsychologistsGrid = ({
  psychologists,
  onFavorite,
  disabledButton,
}: PsychologistsGridProps) => {
  return (
    <>
      <ul className={css.list}>
        {psychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.id}
            psychologist={psychologist}
            onFavorite={onFavorite}
            disabledButton={disabledButton}
          />
        ))}
      </ul>
    </>
  );
};

export default PsychologistsGrid;
