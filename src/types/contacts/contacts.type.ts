import { IBaseDateType, IBaseLocation } from '@/types';

export interface IKeyValueStrings {
  [key: string]: string;
}
export interface IContacts extends IBaseLocation, IBaseDateType {
  id: number;
  address: string;
  phone: string;
  email: string;
  socialNetworks: IKeyValueStrings;
  about: string;
}

interface ISocial {
  facebook: string;
  telegram: string;
  instagram: string;
  partners: string;
}

export interface IContactsForm {
  address: string;
  phone: string;
  email: string;
  socialNetworks: ISocial;
  about: string;
}
