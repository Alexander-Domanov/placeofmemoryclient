import axios from 'axios';
import { authInstance } from '@/services';
import { IContacts, IContactsForm } from '@/types';

export const getContacts = () => {
  return axios.get<IContacts>(`${process.env.NEXT_PUBLIC_BASE_URL}/contacts`);
};

export const updateContacts = (data: IContactsForm) => {
  return authInstance.put(`contacts`, { ...data });
};
