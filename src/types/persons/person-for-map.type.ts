import { IBaseLocation } from '@/types';

export interface IPersonForMap extends IBaseLocation {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  deathDate: string;
  url: string;
  slug: string;
}
