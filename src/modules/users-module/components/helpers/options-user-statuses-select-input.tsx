import { UserStatusesForSelect } from '@/types';

export const userStatusOptions = [
  { label: 'All', value: UserStatusesForSelect.ALL },
  { label: 'Active', value: UserStatusesForSelect.Active },
  { label: 'Banned', value: UserStatusesForSelect.Banned },
  { label: 'Pending', value: UserStatusesForSelect.Pending },
];
