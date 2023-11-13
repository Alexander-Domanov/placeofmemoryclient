import { IBaseDateType, IBaseLocation } from '@/types';

export interface ITitlePlace extends IBaseLocation, IBaseDateType {
  id: number;
  country: string;
  city: string;
  nameCemetery: string;
  formattedAddress: string;
}
