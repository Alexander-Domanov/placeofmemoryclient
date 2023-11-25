import React from 'react';
import { IContacts } from '@/types';
import BreadcrumbMain from '@/components/Breadcrumb/BreadcrumbMain';

interface Props {
  contacts: IContacts;
}
export const About: React.FC<Props> = ({ contacts }) => {
  return (
    <div className="bg-dark-700 pt-[60px] pb-[60px] pl-[60px] pr-[60px] md:pt-[28px] md:pb-[28px]  lg:pl-[12px] lg:pr-[12px] md:pl-[4px] md:pr-[4px]">
      <div className="container">
        <BreadcrumbMain items={[{ text: 'Пра_праэкт' }]} />

        <div className="flex justify-between md:justify-center md:flex-wrap gap-4 mt-2">
          <h2 className="text-light-300 text-5xl sm:text-3xl">Пра праэкт</h2>
        </div>

        <div className="mt-6 h-[1px] bg-dark-300" />

        <div className="flex items-center justify-center mt-10">
          <div
            className="mt-4 wysiwyg sm:text-xs"
            dangerouslySetInnerHTML={{ __html: contacts.about }}
          />
        </div>
      </div>
    </div>
  );
};
