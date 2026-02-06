import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterData } from '../../types/authTypes';
import { RegistrationSchema } from '../../validations/schemaRegistration';
import css from './RegisterForm.module.css';
import { useState } from 'react';
import SvgIcon from '../ui/icons/SvgIcon';

interface RegisterFormProps {
  onSubmit: (user: RegisterData) => void;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [showPassword, setSetshowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterData>({
    resolver: yupResolver(RegistrationSchema),
    mode: 'onBlur',
  });

  const handleShowPassword = () => {
    setSetshowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputWrapper}>
        <input
          className={`${css.input} ${errors.username ? css.inputError : ''}`}
          type="text"
          placeholder="Name"
          {...register('username')}
        />
        <p className={css.error}>{errors.username?.message}</p>
      </div>

      <div className={css.inputWrapper}>
        <input
          className={`${css.input} ${errors.email ? css.inputError : ''}`}
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <p className={css.error}>{errors.email?.message}</p>
      </div>

      <div className={css.passWrapper}>
        <input
          className={`${css.input} ${css.inputPassword} ${errors.password ? css.inputError : ''}`}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
        />
        <button type="button" className={css.btnEye} onClick={handleShowPassword}>
          {showPassword ? <SvgIcon name="eyeOpen" /> : <SvgIcon name="eyeClose" />}
        </button>
        <p className={css.error}>{errors.password?.message}</p>
      </div>

      <button type="submit" className={css.button} disabled={!isValid || isSubmitting}>
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
