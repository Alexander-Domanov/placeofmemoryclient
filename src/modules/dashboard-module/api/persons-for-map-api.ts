import axios from 'axios';
import { IGerPersonsForMapResponse } from '@/types';
import { authInstance } from '@/services';

export const getPersonsPublicPersons = (lang = 'by', name?: string) => {
  return axios.get<IGerPersonsForMapResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/persons/public-persons/all`,
    {
      params: {
        name,
        lang,
      },
    }
  );
};

export const getPersonsForMap = (lang = 'by', name?: string) => {
  return authInstance.get<IGerPersonsForMapResponse>(
    `persons/public-persons/map`,
    {
      params: {
        name,
        lang,
      },
    }
  );
};
