import * as yup from 'yup';

export const registrationSchema = yup.object({
  userName: yup
    .string()
    .required('User name is required filed')
    .min(6, 'minimum number of characters 6')
    .max(30, 'maximum number of characters 30')
    .trim(),
  email: yup
    .string()
    .required('Email is required filed')
    .email('email must be a valid email')
    .trim(),
  password: yup
    .string()
    .required()
    .min(6, 'minimum number of characters 6')
    .max(20, 'password must be at most 20 characters')
    .trim(),
});
