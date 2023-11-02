import { RiLogoutBoxRLine } from 'react-icons/Ri';
import { AvatarMenuHeader } from '@/components';
import { LogoutButton } from '@/modules/auth-modules/logout-module';
import { DropdownMenuComponent } from '@/ui';

import { routes } from '@/common/routing/routes';
import { IDropdownMenuItems } from '@/types';

const menuHeader: IDropdownMenuItems[] = [
  { title: 'Прыборная панэль', href: routes.dropdownMenuHeader.dashboard },
  { title: 'Наладжваньне', href: routes.dropdownMenuHeader.settings },
  { content: <LogoutButton /> },
];

export const DropdownMenuHeader = () => {
  return (
    <DropdownMenuComponent menuLabel={<AvatarMenuHeader />} items={menuHeader}>
      <RiLogoutBoxRLine size={24} />
    </DropdownMenuComponent>
  );
};
