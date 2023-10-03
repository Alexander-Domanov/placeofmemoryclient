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
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain a special character'
    )
    .matches(/[0-9]/, 'Password must contain a digit')
    .trim(),
});
