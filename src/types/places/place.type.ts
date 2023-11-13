import {
  IBaseDateType,
  IBaseLocation,
  IBaseOwnerInfo,
  IBasePhotos,
  IPerson,
} from '@/types';

export interface IPlace
  extends IBaseLocation,
    IBaseDateType,
    IBaseOwnerInfo,
    IBasePhotos {
  id: number;
  status: string;
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  slug: string;
  personsLocation: IPerson[];
}
