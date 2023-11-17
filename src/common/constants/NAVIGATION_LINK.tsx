import { routes } from '@/common/routing/routes';
import { useTranslation } from '@/components/internationalization';
import { IDropdownMenuItems } from '@/types';
import { LogoutButton } from '@/modules/auth-modules/logout-module';

export interface INavigationLinks {
  title: string;
  link: string;
}

const NAVIGATION_LINK = (): INavigationLinks[] => {
  const { t } = useTranslation();
  return [
    { title: t.header.articles, link: routes.articles.index },
    { title: t.header.places, link: routes.places.page(String(1)) },
    { title: t.header.people, link: routes.people.index },
    { title: t.header.aboutProject, link: routes.aboutTheProject.index },
    { title: t.header.map, link: routes.map.index },
  ];
};

const AUTH_LINK = (): INavigationLinks[] => {
  const { t } = useTranslation();
  return [
    { title: t.header.signIn, link: routes.auth.signIn },
    { title: t.header.signUp, link: routes.auth.signUp },
  ];
};
const USER_LINK = (): IDropdownMenuItems[] => {
  const { t } = useTranslation();
  return [
    { title: t.header.dashboard, link: routes.dropdownMenuHeader.dashboard },
    { title: t.header.settings, link: routes.dropdownMenuHeader.settings },
    { content: <LogoutButton /> },
  ];
};

export { NAVIGATION_LINK, USER_LINK, AUTH_LINK };
