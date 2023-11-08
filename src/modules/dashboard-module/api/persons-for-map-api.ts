import { authInstance } from '@/services';
import { IGerPersonsForMapResponse } from '@/types/persons/get-persons-for-map-response.type';

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
