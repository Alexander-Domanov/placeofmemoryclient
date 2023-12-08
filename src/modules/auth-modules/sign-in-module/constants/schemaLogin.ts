import * as yup from 'yup';
import { useTranslation } from '@/components/internationalization';

export const schemaLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();

  return yup.object({
    email: yup
      .string()
      .required(t.auth.signIn.page.schema.email.required)
      .max(130, t.auth.signIn.page.schema.email.max)
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        t.auth.signIn.page.schema.email.email
      )
      .trim(),
    password: yup
      .string()
      .required(t.auth.signIn.page.schema.password.required)
      .min(6, t.auth.signIn.page.schema.password.min)
      .max(20, t.auth.signIn.page.schema.password.max)
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-|=`])[a-zA-Z0-9*.!@$%^&(){}[\]:;<>,.?/~_+\-|=`]{6,20}$/,
        t.auth.signUp.page.schema.password.matches
      )
      .trim(),
  });
};
