import { IAvatarVersions } from '@/types';

interface IOwnerInfo {
  id: number;
  userName: string;
  avatars: IAvatarVersions;
}

export interface IBaseOwnerInfo {
  owner: IOwnerInfo;
}
