import { IAvatarVersions, IBaseDateType, IVersionsType } from '@/types';

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
