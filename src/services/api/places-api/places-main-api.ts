import axios from 'axios';
import { IGetPlacesResponse, IPlace, IPlacesProps } from '@/types';

export const getPlacesMain = async ({
  lang,
  name,
  pageNumber,
  pageSize = 5,
}: IPlacesProps | any) => {
  const res = await axios.get<IGetPlacesResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/places/public/all`,
    {
      params: {
        lang,
        name,
        pageNumber,
        pageSize,
      },
    }
  );

  return res.data;
};

export const getPlaceMain = async ({
  lang,
  slug,
}: Pick<IPlacesProps, 'lang' | 'slug'> | any) => {
  const res = await axios.get<IPlace>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/places/${slug}/public`,
    {
      params: {
        lang,
        slug,
      },
    }
  );

  return res.data;
};
