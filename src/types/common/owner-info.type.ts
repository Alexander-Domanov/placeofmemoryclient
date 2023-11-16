import { IAvatarVersions } from '@/types';

export interface IOwnerInfo {
  id: number;
  userName: string;
  avatars: IAvatarVersions;
}

export interface IBaseOwnerInfo {
  owner: IOwnerInfo;
}
