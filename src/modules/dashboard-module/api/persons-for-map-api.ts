import { authInstance } from '@/services';
import { IGerPersonsForMapResponse } from '@/types';

export const getPersonsForMap = (name?: string, lang?: string) => {
  return authInstance.get<IGerPersonsForMapResponse>(
    'persons/public-persons/all',
    {
      params: {
        name,
        lang,
      },
    }
  );
};
