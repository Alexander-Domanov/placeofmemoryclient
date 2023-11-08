import { IBaseLocation } from '@/types/locations/location.type';
import { IBaseDateType } from '@/types';

export interface IKeyValueStrings {
  [key: string]: string;
}
export interface IContacts extends IBaseLocation, IBaseDateType {
  id: number;
  address: string;
  phone: string;
  email: string;
  socialNetworks: IKeyValueStrings;
}

interface ISocial {
  facebook: string;
  twitter: string;
  linkedin: string;
}

export interface IContactsForm {
  address: string;
  phone: string;
  email: string;
  socialNetworks: ISocial;
}
