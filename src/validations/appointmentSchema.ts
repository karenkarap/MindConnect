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
    .length(9, 'Enter 9 digits after +380')
    .matches(/^\d+$/, 'Only digits allowed')
    .required('Phone number is required'),
  comment: Yup.string()
    .trim()
    .min(2, 'Comment must be at least 2 characters')
    .max(1000, 'Comment is too long')
    .required('Comment is required'),
});
