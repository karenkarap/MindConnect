import { useForm } from 'react-hook-form';
import { AppointmentSchema } from '../../validations/appointmentSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './AppointmentForm.module.css';
import type { AppointmentFormData } from '../../types/authTypes';

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => void;
}

const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(AppointmentSchema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputWrapper}>
        <input type="text" placeholder="Name" {...register('username')} className={css.input} />
        {errors.username && <span className={css.error}>{errors.username.message}</span>}
      </div>

      <div>
        <div className={css.inputWrapper}>
          <input type="tel" {...register('phoneNumber')} className={css.input} />
          {errors.phoneNumber && <span className={css.error}>{errors.phoneNumber.message}</span>}
        </div>
      </div>

      <div className={css.inputWrapper}>
        <input type="email" placeholder="Email" {...register('email')} className={css.input} />
        {errors.email && <span className={css.error}>{errors.email.message}</span>}
      </div>

      <div className={css.inputWrapper}>
        <input
          type="comment"
          placeholder="Comment"
          {...register('comment')}
          className={css.input}
        />
        {errors.comment && <span className={css.error}>{errors.comment.message}</span>}
      </div>

      <button type="submit" className={css.btn}>
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
