import React from 'react';
import { IMAGE_FORMATS, MaxAllowedFileSize } from '@/common/constants';
import { useTranslation } from '@/components/internationalization';

export const SupportedImageFormatsTooltip = () => {
  const { t } = useTranslation();
  const formattedString = IMAGE_FORMATS.reduce((acc, format) => {
    const extension = format.split('/')[1].toUpperCase();
    return acc === '' ? extension : `${acc}, ${extension}`;
  }, '');

  return (
    <span>
      <hr />
      {t.dashboard.gallery.support}: {formattedString}.<hr />
      {t.dashboard.gallery.maxFileSize}: {MaxAllowedFileSize} MB
    </span>
  );
};
