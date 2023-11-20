import * as yup from 'yup';
import { useTranslation } from '@/components/internationalization';

export const registrationSchema = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  return yup.object({
    userName: yup
      .string()
      .required(t.auth.signUp.page.schema.userName.required)
      .min(6, t.auth.signUp.page.schema.userName.min)
      .max(30, t.auth.signUp.page.schema.userName.max)
      .trim(),
    email: yup
      .string()
      .required(t.auth.signUp.page.schema.email.required)
      .email(t.auth.signUp.page.schema.email.email)
      .trim(),
    password: yup
      .string()
      .required(t.auth.signUp.page.schema.password.required)
      .min(6, t.auth.signUp.page.schema.password.min)
      .max(20, t.auth.signUp.page.schema.password.max)
      .matches(/[a-z]/, t.auth.signUp.page.schema.password.matches)
      .matches(/[A-Z]/, t.auth.signUp.page.schema.password.matches)
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        t.auth.signUp.page.schema.password.matches
      )
      .matches(/[0-9]/, t.auth.signUp.page.schema.password.matches)
      .trim(),
  });
};
