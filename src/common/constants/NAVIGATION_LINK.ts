import { routes } from '@/common/routing/routes';

export interface INavigationLinks {
  title: string;
  link: string;
}

export const NAVIGATION_LINK: INavigationLinks[] = [
  { title: 'Артыкулы', link: routes.articles.index },
  { title: 'Месца', link: routes.places.index },
  { title: 'Людзі', link: routes.people.index },
  { title: 'Пра праэкт', link: routes.aboutTheProject.index },
  { title: 'Мапа', link: routes.map.index },
];
