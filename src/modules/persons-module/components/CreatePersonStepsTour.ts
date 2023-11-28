import { TourProps } from 'antd';
import { RefObject } from 'react';
import { LocaleType } from '@/components/internationalization';

export const CreatePersonStepsTour = (
  ref: RefObject<any>,
  t: LocaleType
): TourProps['steps'] => [
  {
    title: t.dashboard.persons.create.tour.steps.createPerson.title,
    description: t.dashboard.persons.create.tour.steps.createPerson.description,
    target: () => document.querySelector('.ant-form') as HTMLElement,
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.basicInformation.title,
    description:
      t.dashboard.persons.create.tour.steps.basicInformation.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.firstName.title,
    description: t.dashboard.persons.create.tour.steps.firstName.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(1)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.lastName.title,
    description: t.dashboard.persons.create.tour.steps.lastName.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(2)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.patronymic.title,
    description: t.dashboard.persons.create.tour.steps.patronymic.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(3)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.birthDate.title,
    description: t.dashboard.persons.create.tour.steps.birthDate.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-flex .ant-form-item:nth-child(1)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.deathDate.title,
    description: t.dashboard.persons.create.tour.steps.deathDate.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-flex .ant-form-item:nth-child(2)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.country.title,
    description: t.dashboard.persons.create.tour.steps.country.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(5)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.city.title,
    description: t.dashboard.persons.create.tour.steps.city.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(6)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.biography.title,
    description: t.dashboard.persons.create.tour.steps.biography.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(1) .ant-form-item:nth-child(7)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.selectPlace.title,
    description: t.dashboard.persons.create.tour.steps.selectPlace.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(2) .ant-card-body .ant-form-item:nth-child(1)'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.selectedPlaceInformation.title,
    description:
      t.dashboard.persons.create.tour.steps.selectedPlaceInformation
        .description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(2) .ant-card-body'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.clearSelectedPlace.title,
    description:
      t.dashboard.persons.create.tour.steps.clearSelectedPlace.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(2) .ant-card-body .ant-row .ant-btn-dashed'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.selectLocationOnMap.title,
    description:
      t.dashboard.persons.create.tour.steps.selectLocationOnMap.description,
    target: () => ref.current,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title:
      t.dashboard.persons.create.tour.steps.selectedLocationInformation.title,
    description:
      t.dashboard.persons.create.tour.steps.selectedLocationInformation
        .description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(3) .ant-card-body .ant-form-item'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.uploadPhotos.title,
    description: t.dashboard.persons.create.tour.steps.uploadPhotos.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card:nth-child(4) .ant-card-body .ant-form-item'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.save.title,
    description: t.dashboard.persons.create.tour.steps.save.description,
    target: () =>
      document.querySelector(
        '.ant-form .ant-row .ant-col:nth-child(2) .ant-card .ant-card-body .ant-btn-primary'
      ) as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.next,
    },
  },
  {
    title: t.dashboard.persons.create.tour.steps.tourCompleted.title,
    description:
      t.dashboard.persons.create.tour.steps.tourCompleted.description,
    target: () => document.querySelector('.ant-float-button') as HTMLElement,
    prevButtonProps: {
      children: t.dashboard.persons.create.tour.previous,
    },
    nextButtonProps: {
      children: t.dashboard.persons.create.tour.finish,
    },
  },
];
