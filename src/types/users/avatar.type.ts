import { IAvatarVersions, IVersionsType } from '@/types';
import { IBaseDateType } from '@/types/common/base-date.type';

export interface IAvatarType
  extends IVersionsType<IAvatarVersions>,
    IBaseDateType {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: string;
  aboutMe: string;
}
