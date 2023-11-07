import { IBaseLocation } from '@/types/locations/location.type';

export interface IPersonForMap extends IBaseLocation {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  deathDate: string;
  url: string;
}
