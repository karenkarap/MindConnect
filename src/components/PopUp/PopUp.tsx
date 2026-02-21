import { createPortal } from 'react-dom';
import SvgIcon from '../ui/icons/SvgIcon';
import css from './PopUp.module.css';
import AppointmentForm from './AppointmentForm';
import type { AppointmentFormData } from '../../types/authTypes';

interface PopUpProps {
  onClose: () => void;
  img: string;
  name: string;
}

const PopUp = ({ onClose, img, name }: PopUpProps) => {
  const handleForm = (data: AppointmentFormData) => {
    console.log(data);
  };

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <SvgIcon name="close" width={32} height={32} />
        </button>

        <div className={css.textWrapper}>
          <h1 className={css.title}>Make an appointment with a psychologists</h1>
          <p className={css.description}>
            You are on the verge of changing your life for the better. Fill out the short form below
            to book your personal appointment with a professional psychologist. We guarantee
            confidentiality and respect for your privacy.
          </p>
        </div>

        <div className={css.profileWrapper}>
          <img src={img} alt={name} className={css.image} />
          <div className={css.textNameWrapper}>
            <p className={css.text}>Your psychologists</p>
            <h2 className={css.name}>{name}</h2>
          </div>
        </div>

        <AppointmentForm onSubmit={handleForm} />
      </div>
    </div>,
    document.body
  );
};

export default PopUp;
