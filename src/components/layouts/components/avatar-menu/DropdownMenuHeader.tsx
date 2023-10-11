import { AvatarMenuHeader } from '@/components';
import { LogoutButton } from '@/modules/auth-modules/logout-module';
import { DropdownMenuComponent } from '@/ui';

import { routes } from '@/common/routing/routes';
import { DropdownMenuItems } from '@/types';

const menuHeader: DropdownMenuItems[] = [
  { title: 'Dashboard', href: routes.dropdownMenuHeader.dashboard },
  { title: 'Settings', href: routes.dropdownMenuHeader.settings },
  { content: <LogoutButton /> },
];

export const DropdownMenuHeader = () => {
  return (
    <DropdownMenuComponent menuLabel="My Account" items={menuHeader}>
      <AvatarMenuHeader />
    </DropdownMenuComponent>
  );
};
