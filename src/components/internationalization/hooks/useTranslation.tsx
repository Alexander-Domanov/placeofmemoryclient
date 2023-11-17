import { useRouter } from 'next/router';
import { LocaleType, by, ru } from '@/components/internationalization';

export const useTranslation = () => {
  const { locale, defaultLocale } = useRouter();

  const translations: Record<string, LocaleType> = {
    by,
    ru,
  };

  const t: LocaleType = locale !== undefined ? translations[locale] : by;
  const localeLanguage = locale || 'by';

  return { t, localeLanguage, defaultLocale };
};
