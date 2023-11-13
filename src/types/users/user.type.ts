import {
  IAvatarVersions,
  IBaseDateType,
  IGetArticlesResponse,
  IGetPersonsResponse,
  IGetPlacesResponse,
  ISummaryStatusGroupDto,
} from '@/types';

interface IBaseUserType {
  id: number;
  userName: string;
  firstName: string;
  email: string;
  status: string;
  role: string;
  avatars: IAvatarVersions | null;
}
export interface IUserWithShortExtensions extends IBaseDateType, IBaseUserType {
  places: ISummaryStatusGroupDto | null;
  persons: ISummaryStatusGroupDto | null;
  articles: ISummaryStatusGroupDto | null;
}

export interface IUser extends IBaseDateType, IBaseUserType {
  places: IGetPlacesResponse;
  persons: IGetPersonsResponse;
  articles: IGetArticlesResponse;
}
