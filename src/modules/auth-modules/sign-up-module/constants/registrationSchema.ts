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
      .matches(/^[a-zA-Z0-9_-]*$/, t.auth.signUp.page.schema.userName.matches)
      .trim(),
    email: yup
      .string()
      .required(t.auth.signUp.page.schema.email.required)
      .max(130, t.auth.signUp.page.schema.email.max)
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        t.auth.signUp.page.schema.email.email
      )
      .trim(),
    password: yup
      .string()
      .required(t.auth.signUp.page.schema.password.required)
      .min(6, t.auth.signUp.page.schema.password.min)
      .max(20, t.auth.signUp.page.schema.password.max)
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-|=`])[a-zA-Z0-9*.!@$%^&(){}[\]:;<>,.?/~_+\-|=`]{6,20}$/,
        t.auth.signUp.page.schema.password.matches
      )
      .trim(),
  });
};
