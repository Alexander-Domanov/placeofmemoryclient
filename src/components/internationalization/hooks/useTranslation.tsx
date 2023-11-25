import { useRouter } from 'next/router';
import { by, en, LocaleType, ru } from '@/components/internationalization';

export const useTranslation = () => {
  const { locale, defaultLocale } = useRouter();

  const translations: Record<string, LocaleType> = {
    by,
    ru,
    en,
  };

  const t: LocaleType = locale !== undefined ? translations[locale] : by;
  const localeLanguage = locale || 'by';

  return { t, localeLanguage, defaultLocale };
};
