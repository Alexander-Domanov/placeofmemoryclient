import * as yup from 'yup';
import { useTranslation } from '@/components/internationalization';

export const schemaLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const { emailT, passwordT } = t.auth.signIn.page.schema;
  return yup.object({
    email: yup.string().required(emailT),
    password: yup.string().required(passwordT),
  });
};
