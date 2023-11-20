import { useEffect } from 'react';

import { FieldErrors } from 'react-hook-form';
import { useTranslation } from '@/components/internationalization';

export const useChangingLanguageError = ({
  trigger,
  errors,
}: {
  trigger: () => void;
  errors: FieldErrors;
}) => {
  const { localeLanguage } = useTranslation();

  useEffect(() => {
    if (Object.values(errors).length > 0) {
      trigger();
    }
  }, [localeLanguage]);
};
