import axios from 'axios';
import { IGerPersonsForMapResponse } from '@/types';

export const getPersonsForMap = (name?: string, lang?: string) => {
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
