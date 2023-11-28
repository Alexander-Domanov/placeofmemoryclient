import {
  IBaseDateType,
  IBaseLocation,
  IBaseOwnerInfo,
  IBasePhotos,
} from '@/types';

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
  country: string;
  city: string;
  slug: string;
  place: {
    id: number;
    name: string;
    formattedAddress: string;
  };
}

export interface IPersonById extends Omit<IPerson, 'birthDate' | 'deathDate'> {
  birthDay: number | null;
  birthMonth: number | null;
  birthYear: number | null;
  deathDay: number | null;
  deathMonth: number | null;
  deathYear: number | null;
}
