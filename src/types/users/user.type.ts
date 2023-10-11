import { IPlace } from '@/types/places/place.type';
import { IPerson } from '@/types/persons/person.type';
import { IArticle } from '@/types/articles/article.type';
import { IAvatarVersions } from '@/types';
import { IBaseDateType } from '@/types/common/base-date.type';

export interface IUser extends IBaseDateType {
  id: number;
  userName: string;
  firstName: string;
  email: string;
  status: string;
  role: string;
  avatars: IAvatarVersions | null;
  places: IPlace[] | [];
  persons: IPerson[] | [];
  articles: IArticle[] | [];
}
