import React from 'react';
import { IMAGE_FORMATS, MaxAllowedFileSize } from '@/common/constants';

export const SupportedImageFormatsTooltip = () => {
  const formattedString = IMAGE_FORMATS.reduce((acc, format) => {
    const extension = format.split('/')[1].toUpperCase();
    return acc === '' ? extension : `${acc}, ${extension}`;
  }, '');

  return (
    <span>
      <hr />
      Supported formats: {formattedString}.<hr />
      Max allowed file size: {MaxAllowedFileSize} MB
    </span>
  );
};
