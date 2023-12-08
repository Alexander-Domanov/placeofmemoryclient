import * as yup from 'yup';
import { useTranslation } from '@/components/internationalization';

export const emailSchema = () => {
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
  });
};
