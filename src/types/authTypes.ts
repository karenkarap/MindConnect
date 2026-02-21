import type { AppointmentSchema } from '../validations/appointmentSchema';
import * as Yup from 'yup';

export interface LoginData {
  password: string;
  email: string;
}

export interface RegisterData extends LoginData {
  username: string;
}

export type AppointmentFormData = Yup.InferType<typeof AppointmentSchema>;
