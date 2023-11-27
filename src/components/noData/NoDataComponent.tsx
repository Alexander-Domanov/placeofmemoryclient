import { FC } from 'react';
import { useTranslation } from '@/components/internationalization';

export const NoDataComponent: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center py-20 text-2xl text-dark-100">
      {t.common.noData}
    </div>
  );
};
