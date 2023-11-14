import { useRouter } from 'next/router';
import { LocaleType, Ru, By } from '@/components/internationalization';

export const useTranslation = () => {
  const { locale, defaultLocale } = useRouter();

  const translations: Record<string, LocaleType> = {
    By,
    Ru,
  };

  const t: LocaleType = locale !== undefined ? translations[locale] : By;
  const localeLanguage = locale || 'By';

  return { t, localeLanguage, defaultLocale };
};
