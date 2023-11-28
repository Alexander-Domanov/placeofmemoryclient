import { TourProps } from 'antd';
import { LocaleType } from '@/components/internationalization';

export const PersonsStepsTour = (t: LocaleType): TourProps['steps'] => [
  {
    title: t.dashboard.persons.tour.steps.top.title,
    description: t.dashboard.persons.tour.steps.top.description,
    target: () =>
      document.querySelector(
        '.ant-flex .ant-flex:nth-child(1) .ant-btn:nth-child(1)'
      ) as HTMLElement,
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.filter.title,
    description: t.dashboard.persons.tour.steps.filter.description,
    target: () =>
      document.querySelector(
        '.ant-flex .ant-flex:nth-child(1) .ant-btn:nth-child(2)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.name.title,
    description: t.dashboard.persons.tour.steps.name.description,
    placement: 'top',
    target: () =>
      document.querySelector(
        '.ant-flex .ant-flex .ant-flex:nth-child(2) .ant-input-affix-wrapper'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.lastName.title,
    description: t.dashboard.persons.tour.steps.lastName.description,
    target: () =>
      document.querySelector(
        '.ant-flex .ant-flex .ant-flex:nth-child(2) .ant-input-affix-wrapper'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.lang.title,
    description: t.dashboard.persons.tour.steps.lang.description,
    target: () =>
      document.querySelector(
        '.ant-select-selection-search-input'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },

  {
    title: t.dashboard.persons.tour.steps.dataBirth.title,
    description: t.dashboard.persons.tour.steps.dataBirth.description,
    target: () =>
      document.querySelector(
        'input[placeholder="Year of birth"]'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.dataDeath.title,
    description: t.dashboard.persons.tour.steps.dataDeath.description,
    target: () =>
      document.querySelector(
        'input[placeholder="Year of death"]'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.country.title,
    description: t.dashboard.persons.tour.steps.country.description,
    target: () =>
      document.querySelector(
        'input[placeholder="Search by Country"]'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.city.title,
    description: t.dashboard.persons.tour.steps.city.description,
    target: () =>
      document.querySelector(
        'input[placeholder="Search by City"]'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.table.title,
    description: t.dashboard.persons.tour.steps.table.description,
    target: () => document.querySelector('.ant-table') as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.next.title,
    description: t.dashboard.persons.tour.steps.next.description,
    target: () => document.querySelector('.ant-pagination-next') as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.next,
    },
  },
  {
    title: t.dashboard.persons.tour.steps.finish.title,
    description: t.dashboard.persons.tour.steps.finish.description,
    target: () =>
      document.querySelector('.ant-pagination-options') as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.tour.finish,
    },
  },
];
