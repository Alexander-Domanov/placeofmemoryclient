import { RiLogoutBoxRLine } from 'react-icons/ri';
import { PiListBold } from 'react-icons/pi';
import { AvatarMenuHeader } from '@/components';
import { LogoutButton } from '@/modules/auth-modules/logout-module';
import { DropdownMenuComponent } from '@/ui';

import { routes } from '@/common/routing/routes';
import { IDropdownMenuItems } from '@/types';
import { AUTH_LINK, NAVIGATION_LINK } from '@/common/constants';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useUserStore } from '@/store/userStore';

const MENU_HEADER: IDropdownMenuItems[] = [
  { title: 'Прыборная панэль', link: routes.dropdownMenuHeader.dashboard },
  { title: 'Наладжваньне', link: routes.dropdownMenuHeader.settings },
  { content: <LogoutButton /> },
];

export const DropdownMenuHeader = () => {
  const { userName } = useUserStore();
  const { width } = useWindowSize();

  // eslint-disable-next-line no-nested-ternary
  const NAVIGATION_USER_NAME = userName
    ? width && width > 1023
      ? MENU_HEADER
      : [...NAVIGATION_LINK, ...MENU_HEADER]
    : [...NAVIGATION_LINK, ...AUTH_LINK];

  return (
    <DropdownMenuComponent
      menuLabel={userName ? <AvatarMenuHeader /> : null}
      items={NAVIGATION_USER_NAME}
    >
      {width && width < 1023 ? (
        <PiListBold size={24} />
      ) : (
        <RiLogoutBoxRLine size={24} />
      )}
    </DropdownMenuComponent>
  );
};
