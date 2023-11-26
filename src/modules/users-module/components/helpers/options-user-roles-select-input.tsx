import { UserRolesForSelect } from '@/types';
import { LocaleType } from '@/components/internationalization';

export const UserRolesOptions = (t: LocaleType) => [
  { label: t.dashboard.users.selectRole.all, value: UserRolesForSelect.ALL },
  {
    label: t.dashboard.users.selectRole.admin,
    value: UserRolesForSelect.ADMIN,
  },
  {
    label: t.dashboard.users.selectRole.editor,
    value: UserRolesForSelect.EDITOR,
  },
  {
    label: t.dashboard.users.selectRole.author,
    value: UserRolesForSelect.AUTHOR,
  },
  { label: t.dashboard.users.selectRole.user, value: UserRolesForSelect.USER },
];
