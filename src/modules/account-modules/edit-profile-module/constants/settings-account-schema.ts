import * as yup from 'yup';
import { useTranslation } from '@/components/internationalization';

const usernameRegex = /^[0-9A-Za-z_-]+$/;

export const settingsSchema = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  const { min, matches, max, required } = t.account.page.schema.userName;
  return yup.object({
    userName: yup.lazy((value) =>
      !value
        ? yup
            .string()
            .matches(usernameRegex, matches)
            .required(required)
            .min(6, min)
            .max(30, max)
            .trim()
        : yup
            .string()
            .min(6, min)
            .max(30, max)
            .matches(usernameRegex, matches)
            .trim()
    ),
    city: yup.string().trim(),
  });
};
