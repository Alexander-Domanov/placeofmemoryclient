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
  { slug: 'by', title: 'Бел' },
  { slug: 'ru', title: 'Рус' },
  { slug: 'en', title: 'Eng' },
];

const ChevronDownIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-4 h-4 ml-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const LanguageSwitcher: FC = () => {
  const { locale, push, pathname, query, asPath } = useRouter();
  const currentLanguage = languages.find((lang) => lang.slug === locale);
  const onSelectLanguage = (locale: string) => {
    push({ pathname, query }, asPath, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="language switcher"
        className="bg-transparent px-3 text-sm outline-none focus:border-0"
      >
        <div className="flex items-center gap-1">
          {currentLanguage!.title} <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-dark-500 border-0 z-50 px-3 text-sm text-white select-none min-w-[3rem]">
        {languages.map((item, index) => (
          <DropdownMenuItem
            className="my-3 cursor-pointer transition-colors"
            onSelect={() => onSelectLanguage(item.slug)}
            key={index}
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
