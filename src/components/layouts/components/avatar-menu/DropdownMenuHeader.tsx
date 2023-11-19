import { RiLogoutBoxRLine } from 'react-icons/ri';
import { PiListBold } from 'react-icons/pi';
import { AvatarMenuHeader } from '@/components';
import { DropdownMenuComponent } from '@/ui';
import { AUTH_LINK, NAVIGATION_LINK, USER_LINK } from '@/common/constants';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useUserStore } from '@/store/userStore';

export const DropdownMenuHeader = () => {
  const { userName } = useUserStore();
  const { width } = useWindowSize();

  // eslint-disable-next-line no-nested-ternary
  const NAVIGATION_USER_NAME = userName
    ? width && width > 1023
      ? USER_LINK()
      : [...NAVIGATION_LINK(), ...USER_LINK()]
    : [...NAVIGATION_LINK(), ...AUTH_LINK()];

  return (
    <DropdownMenuComponent
      menuLabel={
        userName && width && width <= 1023 ? <AvatarMenuHeader /> : null
      }
      items={NAVIGATION_USER_NAME}
    >
      {width && width <= 1023 ? <PiListBold size={24} /> : <AvatarMenuHeader />}
    </DropdownMenuComponent>
  );
};
