import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import SvgIcon from '../ui/icons/SvgIcon';
import { useState } from 'react';

interface ModalProps {
  variant: 'LogIn' | 'Registration';
  onClose: () => void;
}

const Modal = ({ variant, onClose }: ModalProps) => {
  const [showPassword, setSetshowPassword] = useState(false);

  const handleShowPassword = () => {
    setSetshowPassword(!showPassword);
  };

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <SvgIcon name="close" width={32} height={32} />
        </button>

        <div className={css.textWrapper}>
          <h1 className={css.title}>{variant === 'LogIn' ? 'Log In' : 'Registration'}</h1>
          <p className={css.text}>
            {variant === 'LogIn'
              ? 'Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.'
              : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'}
          </p>
        </div>

        <form action={handleSubmit} className={css.form}>
          {variant === 'Registration' && (
            <input className={css.input} type="text" placeholder="Name" name="name" />
          )}
          <input className={css.input} type="email" placeholder="Email" name="email" />
          <div className={css.passWrapper}>
            <input
              className={`${css.input} ${css.inputPassword}`}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
            />
            <button type="button" className={css.btnEye} onClick={handleShowPassword}>
              {showPassword ? <SvgIcon name="eyeOpen" /> : <SvgIcon name="eyeClose" />}
            </button>
          </div>
          <button type="submit" className={css.button}>
            {variant === 'LogIn' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
