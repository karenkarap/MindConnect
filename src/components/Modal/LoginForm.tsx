import { useState } from 'react';
import css from './LoginForm.module.css';
import type { LoginData } from '../../types/authTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../validations/schemaRegistration';
import { useForm } from 'react-hook-form';
import SvgIcon from '../ui/icons/SvgIcon';

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [showPassword, setSetshowPassword] = useState(false);

  const handleShowPassword = () => {
    setSetshowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginData>({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
