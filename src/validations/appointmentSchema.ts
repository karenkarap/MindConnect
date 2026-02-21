import * as Yup from 'yup';

export const AppointmentSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string().trim().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string()
    .trim()
    .length(9, 'Phone number must be exactly 9 characters')
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .required('Phone number is required'),
  time: Yup.string()
    .required('Time is required')
    .matches(/^\d{2}:\d{2}$/, 'Неверный формат'),
  comment: Yup.string()
    .trim()
    .min(2, 'Comment must be at least 2 characters')
    .max(1000, 'Comment is too long')
    .required('Comment is required'),
});
