import React from 'react';

import Link from 'next/link';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/common/utils/cn';

const LinkVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-primary underline-offset-4 hover:underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
interface PropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof LinkVariants> {
  title: string;
  href: string;
}

export const LinkComponent = ({
  title,
  href,
  variant,
  className,
}: PropsType) => {
  return (
    <Link href={href} className={cn(LinkVariants({ variant, className }))}>
      {title}
    </Link>
  );
};
