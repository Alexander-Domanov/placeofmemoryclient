import React from 'react';

import Image from 'next/image';

import placeholder from '@/assets/images/img-placeholder.png';

type PropsType = {
  src?: any;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
};
export const ImageComponent = ({
  src,
  alt,
  height,
  width,
  className,
}: PropsType) => {
  return (
    <Image
      src={src || placeholder}
      alt={alt}
      className={`${className} z-1 h-full w-full`}
      width={width}
      height={height}
    />
  );
};
