import { UserStatusesForSelect } from '@/types';
import { LocaleType } from '@/components/internationalization';

export const UserStatusOptions = (t: LocaleType) => [
  {
    label: t.dashboard.users.selectStatus.all,
    value: UserStatusesForSelect.ALL,
  },
  {
    label: t.dashboard.users.selectStatus.active,
    value: UserStatusesForSelect.Active,
  },
  {
    label: t.dashboard.users.selectStatus.banned,
    value: UserStatusesForSelect.Banned,
  },
  {
    label: t.dashboard.users.selectStatus.pending,
    value: UserStatusesForSelect.Pending,
  },
];
