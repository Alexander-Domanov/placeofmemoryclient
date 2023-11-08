import { authInstance } from '@/services';
import { IContacts, IContactsForm } from '@/types';

export const getContacts = () => {
  return authInstance.get<IContacts>('contacts');
};

export const updateContacts = (data: IContactsForm) => {
  return authInstance.put(`contacts`, { ...data });
};
