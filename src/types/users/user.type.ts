import {
  IAvatarVersions,
  IGetPersonsResponse,
  IGetPlacesResponse,
} from '@/types';
import { IBaseDateType } from '@/types/common/base-date.type';
import { ISummaryStatusGroupDto } from '@/types/common/summary-status-group.type';
import { IGetArticlesResponse } from '@/types/articles/get-articles-response.type';

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
