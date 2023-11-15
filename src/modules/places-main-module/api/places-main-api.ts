import axios from 'axios';
import { authInstance } from '@/services';
import {
  IPlacesProps,
  IPlacesMainResponse,
  IPlacesMain,
} from '@/modules/places-main-module';

export const getPlacesMain = async ({
  lang,
  name,
  country,
  city,
  pageNumber,
  pageSize = 3,
}: IPlacesProps | any) => {
  const res = await authInstance.get<IPlacesMainResponse>('places/public/all', {
    params: {
      lang,
      name,
      country,
      city,
      pageNumber,
      pageSize,
    },
  });

  return res.data;
};

export const getPlacesMainForSSR = async ({
  lang,
  name,
  pageNumber,
  pageSize,
}: IPlacesProps | any) => {
  const res = await axios.get<IPlacesMainResponse>(
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
  const res = await authInstance.get<IPlacesMain>(`places/${slug}/public`, {
    params: {
      lang,
      slug,
    },
  });

  return res.data;
};

export const getPlaceMainForSSR = async ({
  lang,
  slug,
}: Pick<IPlacesProps, 'lang' | 'slug'> | any) => {
  const res = await axios.get<IPlacesMain>(
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
