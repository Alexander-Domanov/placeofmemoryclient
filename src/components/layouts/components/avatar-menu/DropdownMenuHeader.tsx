import { RiLogoutBoxRLine } from 'react-icons/Ri';
import { PiListBold } from 'react-icons/pi';
import { AvatarMenuHeader } from '@/components';
import { LogoutButton } from '@/modules/auth-modules/logout-module';
import { DropdownMenuComponent, DropdownMenuSeparator } from '@/ui';

import { routes } from '@/common/routing/routes';
import { IDropdownMenuItems } from '@/types';
import { NAVIGATION_LINK } from '@/common/constants';
import { useWindowSize } from '@/common/hooks/useWindowResize';

const menuHeader: IDropdownMenuItems[] = [
  { title: 'Прыборная панэль', link: routes.dropdownMenuHeader.dashboard },
  { title: 'Наладжваньне', link: routes.dropdownMenuHeader.settings },
  { content: <LogoutButton /> },
];

export const DropdownMenuHeader = () => {
  const { width } = useWindowSize();
  const navigation =
    width && width < 767 ? [...NAVIGATION_LINK, ...menuHeader] : menuHeader;

  return (
    <DropdownMenuComponent menuLabel={<AvatarMenuHeader />} items={navigation}>
      {width && width < 767 ? (
        <PiListBold size={24} />
      ) : (
        <RiLogoutBoxRLine size={24} />
      )}
    </DropdownMenuComponent>
  );
};
