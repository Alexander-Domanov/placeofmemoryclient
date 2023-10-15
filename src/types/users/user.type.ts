import { IAvatarVersions } from '@/types';
import { IBaseDateType } from '@/types/common/base-date.type';
import { ISummaryStatusGroupDto } from '@/types/common/summary-status-group.type';

export interface IUserWithShortExtensions extends IBaseDateType {
  id: number;
  userName: string;
  firstName: string;
  email: string;
  status: string;
  role: string;
  avatars: IAvatarVersions | null;
  places: ISummaryStatusGroupDto | null;
  persons: ISummaryStatusGroupDto | null;
  articles: ISummaryStatusGroupDto | null;
}
