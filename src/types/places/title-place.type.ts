import { IBaseLocation } from '@/types/locations/location.type';
import { IBaseDateType } from '@/types/common/base-date.type';

export interface ITitlePlace extends IBaseLocation, IBaseDateType {
  id: number;
  country: string;
  city: string;
  nameCemetery: string;
  formattedAddress: string;
}
