import * as yup from 'yup';
import { useTranslation } from '@/components/internationalization';

export const emailSchema = () => {
  const { t } = useTranslation();
  return yup.object({
    email: yup
      .string()
      .required(t.auth.signUp.page.schema.email.required)
      .email(t.auth.signUp.page.schema.email.email)
      .trim(),
  });
};
