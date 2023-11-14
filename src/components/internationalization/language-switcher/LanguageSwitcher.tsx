import React, { FC } from 'react';
import { useRouter } from 'next/router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui';
// import styles from './LanguageSwitcher.module.scss';

interface Language {
  slug: string;
  title: string;
}

const languages: Language[] = [
  { slug: 'By', title: 'Бел' },
  { slug: 'Ru', title: 'Рус' },
];

export const LanguageSwitcher: FC = () => {
  const { locale, push, pathname, query, asPath } = useRouter();
  const currentLanguage = languages.find((lang) => lang.slug === locale);
  const onSelectLanguage = (locale: string) => {
    push({ pathname, query }, asPath, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent px-3 text-sm outline-none focus:border-0">
        {currentLanguage!.title}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark-500 border-0 z-10 px-3 text-sm text-white select-none min-w-[4rem]">
        {languages.map((item, index) => (
          <DropdownMenuItem
            className="my-3 cursor-pointer transition-colors"
            onSelect={() => onSelectLanguage(item.slug)}
            key={index}
          >
            {item.slug}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
