import { TourProps } from 'antd';
import { RefObject } from 'react';

export const createPersonStepsTour = (
  ref: RefObject<any>
): TourProps['steps'] => [
  {
    title: 'Create a Person',
    description: "Welcome to the person creation page. Let's get started!",
    target: () => document.querySelector('.ant-form') as HTMLElement,
  },
  {
    title: 'Basic Information',
    description: 'Fill in the basic information about the person.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1)'
      ) as HTMLElement,
  },
  {
    title: 'First Name',
    description: 'Enter the first name of the person.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(1)'
      ) as HTMLElement,
  },
  {
    title: 'Last Name',
    description: 'Enter the last name of the person.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(2)'
      ) as HTMLElement,
  },
  {
    title: 'Patronymic',
    description: 'Enter the patronymic name of the person.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(3)'
      ) as HTMLElement,
  },
  {
    title: 'Birth Date',
    description: 'Select the birth date of the person.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-flex .ant-form-item:nth-child(1)'
      ) as HTMLElement,
  },
  {
    title: 'Death Date',
    description: 'Select the death date of the person.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-flex .ant-form-item:nth-child(2)'
      ) as HTMLElement,
  },
  {
    title: 'Country',
    description:
      'This field is filled in automatically when you select a location on the map.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(5)'
      ) as HTMLElement,
  },
  {
    title: 'City',
    description:
      'This field is filled in automatically when you select a location on the map.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(6)'
      ) as HTMLElement,
  },
  {
    title: 'Biography',
    description:
      "Share some details about the person's life in the biography section.",
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(7)'
      ) as HTMLElement,
  },
  {
    title: 'Select a Place',
    description:
      'Choose from the published places by name, if you know what the name of the place is. ' +
      'This could be the name of a cemetery or other mass grave of people. This is to link people into clusters.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(2) .ant-card-body .ant-form-item:nth-child(1)'
      ) as HTMLElement,
  },
  {
    title: 'Selected Place Information',
    description: 'Review information about the selected place.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(2) .ant-card-body'
      ) as HTMLElement,
  },
  {
    title: 'Clear Selected Place',
    description: 'If needed, you can clear the selected place.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(2) .ant-card-body .ant-row .ant-btn-dashed'
      ) as HTMLElement,
  },
  {
    title: 'Select Location on Map',
    description: 'Pinpoint the exact location on the map.',
    target: () => ref.current,
  },
  {
    title: 'Selected Location Information',
    description:
      'Review information about the pinpoint the exact  location on the map.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(3) .ant-card-body .ant-form-item'
      ) as HTMLElement,
  },
  {
    title: 'Upload Photos',
    description: 'Add photos of the person. You can upload multiple photos.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(4) .ant-card-body .ant-form-item'
      ) as HTMLElement,
  },
  {
    title: 'Save',
    description:
      'Once you\'ve filled in the details, click "Save" to create the person.',
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card .ant-card-body .ant-btn-primary'
      ) as HTMLElement,
  },
  {
    title: 'Tour Completed',
    description:
      'Congratulations! You have completed the person creation process.',
    target: () => document.querySelector('.ant-float-button') as HTMLElement,
  },
];
