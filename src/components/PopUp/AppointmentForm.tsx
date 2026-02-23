import { useForm } from 'react-hook-form';
import { AppointmentSchema } from '../../validations/appointmentSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './AppointmentForm.module.css';
import type { AppointmentFormData } from '../../types/authTypes';
import { RotatingLines } from 'react-loader-spinner';

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => void;
}

const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(AppointmentSchema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputWrapper}>
        <input
          type="text"
          placeholder="Name"
          {...register('username')}
          className={`${css.input} ${errors.username ? css.inputError : ''}`}
        />
        {errors.username && <p className={css.error}>{errors.username.message}</p>}
      </div>

      <div>
        <div className={css.inputWrapper}>
          <span className={css.prefix}>+380</span>
          <input
            type="tel"
            {...register('phoneNumber')}
            className={`${css.input} ${css.inputWithPrefix} ${errors.phoneNumber ? css.inputError : ''}`}
          />
          {errors.phoneNumber && <p className={css.error}>{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div className={css.inputWrapper}>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={`${css.input} ${errors.email ? css.inputError : ''}`}
        />

        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.inputWrapper}>
        <input
          type="comment"
          placeholder="Comment"
          {...register('comment')}
          className={`${css.input} ${errors.comment ? css.inputError : ''}`}
        />
        {errors.comment && <p className={css.error}>{errors.comment.message}</p>}
      </div>

      <button type="submit" className={css.button} disabled={!isValid || isSubmitting}>
        {isSubmitting ? (
          <RotatingLines
            visible={true}
            color="#fbfbfb"
            strokeWidth="5"
            animationDuration="1"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass={css.loader}
          />
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
};

export default AppointmentForm;
