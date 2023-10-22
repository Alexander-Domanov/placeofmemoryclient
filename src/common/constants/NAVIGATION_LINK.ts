import { routes } from '@/common/routing/routes';

export interface INavigationLinks {
  title: string;
  link: string;
}

export const NAVIGATION_LINK: INavigationLinks[] = [
  { title: 'АРТЫКУЛЫ', link: routes.articles.index },
  { title: 'МЕСЦА', link: routes.place.index },
  { title: 'ЛЮДЗІ', link: routes.people.index },
  { title: 'ПРА ПРАЭКТ', link: routes.aboutTheProject.index },
  { title: 'МАПА', link: routes.map.index },
];
