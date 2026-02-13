import type { Psychologist } from '../../types/psychologistsTypes';
import css from './Psychologist.module.css';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
  return <li></li>;
};

export default PsychologistCard;
