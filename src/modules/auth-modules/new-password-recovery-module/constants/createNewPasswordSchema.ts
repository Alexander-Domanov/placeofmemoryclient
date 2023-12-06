import * as yup from 'yup';
import { useTranslation } from '@/components/internationalization';

export const createNewPasswordSchema = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  return yup.object({
    password: yup
      .string()
      .required(t.auth.recovery.recoveryPage.errorT.passwordT)
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
