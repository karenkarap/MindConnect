import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import SvgIcon from '../ui/icons/SvgIcon';
import { useEffect } from 'react';
import type { ModalType } from '../../types/modalType';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import type { LoginData, RegisterData } from '../../types/authTypes';

interface ModalProps {
  variant: ModalType;
  onClose: () => void;
  onSubmitRegister: (data: RegisterData) => void;
  onSubmitLogin: (data: LoginData) => void;
}

const Modal = ({ variant, onClose, onSubmitRegister, onSubmitLogin }: ModalProps) => {
  useEffect(() => {
    const hadleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', hadleEscPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', hadleEscPress);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <SvgIcon name="close" width={32} height={32} />
        </button>

        <div className={css.textWrapper}>
          <h1 className={css.title}>{variant === 'login' ? 'Log In' : 'Registration'}</h1>
          <p className={css.text}>
            {variant === 'login'
              ? 'Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.'
              : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'}
          </p>
        </div>
        {variant === 'login' && <LoginForm onSubmit={onSubmitLogin} />}
        {variant === 'register' && <RegisterForm onSubmit={onSubmitRegister} />}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
