import { TourProps } from 'antd';

export const personsStepsTour: TourProps['steps'] = [
  {
    title: 'Top',
    description: 'First step, you can add new person.',
    target: () =>
      document.querySelector(
        '.ant-flex .ant-flex:nth-child(1) .ant-btn:nth-child(1)'
      ) as HTMLElement,
  },
  {
    title: 'Search by First Name',
    description: 'Enter the first name to search for a person.',
    target: () =>
      document.querySelector(
        'input[placeholder="Search by First Name"]'
      ) as HTMLElement,
  },
  {
    title: 'Search by Last Name',
    description: 'Enter the last name to search for a person.',
    target: () =>
      document.querySelector(
        'input[placeholder="Search by Last Name"]'
      ) as HTMLElement,
  },
  {
    title: 'Select Language for Content',
    description: 'Select a language to view the content in that language.',
    target: () =>
      document.querySelector(
        '.ant-select-selection-search-input'
      ) as HTMLElement,
  },
  {
    title: 'Open Filters',
    description: 'Click here to open the filters.',
    placement: 'top',
    target: () =>
      document.querySelector(
        '.ant-flex .ant-flex:nth-child(1) .ant-btn:nth-child(2)'
      ) as HTMLElement,
  },
  {
    title: 'Search by Year of Birth',
    description:
      'Enter the year of birth to search for persons born in that year.',
    target: () =>
      document.querySelector(
        'input[placeholder="Year of birth"]'
      ) as HTMLElement,
  },
  {
    title: 'Search by Year of Death',
    description:
      'Enter the year of death to search for persons who died in that year.',
    target: () =>
      document.querySelector(
        'input[placeholder="Year of death"]'
      ) as HTMLElement,
  },
  {
    title: 'Search by Country',
    description: 'Enter the country to search for persons in that country.',
    target: () =>
      document.querySelector(
        'input[placeholder="Search by Country"]'
      ) as HTMLElement,
  },
  {
    title: 'Search by City',
    description: 'Enter the city to search for persons in that city.',
    target: () =>
      document.querySelector(
        'input[placeholder="Search by City"]'
      ) as HTMLElement,
  },
  {
    title: 'Table',
    description:
      'This is the table of persons. You can see their details here.',
    target: () => document.querySelector('.ant-table') as HTMLElement,
  },
  {
    title: 'Next Page',
    description: 'Click here to navigate to the next page.',
    target: () => document.querySelector('.ant-pagination-next') as HTMLElement,
  },
  {
    title: 'Page Size',
    description: 'Choose the number of items per page here.',
    target: () =>
      document.querySelector('.ant-pagination-options') as HTMLElement,
  },
];
