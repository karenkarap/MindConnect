import type { Psychologist } from '../../types/psychologistsTypes';
import css from './Psychologist.module.css';

interface PsychologistProps {
  psychologist: Psychologist;
}

const Psychologist = ({ psychologist }: PsychologistProps) => {
  return <li></li>;
};

export default Psychologist;
