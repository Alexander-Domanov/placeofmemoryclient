import React from 'react';
import { IMAGE_FORMATS } from '@/common/constants';

export const SupportedImageFormatsTooltip = () => {
  const formattedString = IMAGE_FORMATS.reduce((acc, format) => {
    const extension = format.split('/')[1].toUpperCase();
    return acc === '' ? extension : `${acc}, ${extension}`;
  }, '');

  return <span>Supported formats: {formattedString}</span>;
};
