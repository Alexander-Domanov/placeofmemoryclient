import React from 'react';
import { useTranslation } from '@/components/internationalization';

export const Spinner = () => {
  const { t } = useTranslation();
  return (
    <div
      className="inline-block text-accent-500 sm:h-4 sm:w-4 h-8 w-8 animate-spin rounded-full sm:border-2 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        {t.common.loading}
      </span>
    </div>
  );
};
