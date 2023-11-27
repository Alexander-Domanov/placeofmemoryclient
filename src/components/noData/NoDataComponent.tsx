import { FC } from 'react';
import { useTranslation } from '@/components/internationalization';

export const NoDataComponent: FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex justify-center mt-20 text-2xl text-dark-100"
      style={{ minHeight: '200px' }}
    >
      {t.common.noData}
    </div>
  );
};
