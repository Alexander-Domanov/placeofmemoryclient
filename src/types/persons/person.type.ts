import { IBaseLocation } from '@/types/locations/location.type';
import { IBaseOwnerInfo } from '@/types/common/owner-info.type';
import { IBaseDateType } from '@/types';
import { IBasePhotos } from '@/types/common/base-photos.type';

export interface IPerson
  extends IBaseLocation,
    IBaseDateType,
    IBaseOwnerInfo,
    IBasePhotos {
  status: string;
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
  birthDate: string;
  deathDate: string;
  slug: string;
  place: {
    id: number;
    name: string;
  };
}
