import * as yup from 'yup';

export const createNewPasswordSchema = yup.object({
  password: yup
    .string()
    .trim()
    .required()
    .min(6)
    .max(20)
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain a special character'
    )
    .matches(/[0-9]/, 'Password must contain a digit'),
});
