import { authInstance } from '@/services';
import { IGalleryFile, IGetGalleryResponse } from '@/types';

export const getGallery = (
  page: number,
  pageSize: number,
  status: string,
  type: string
) => {
  return authInstance.get<IGetGalleryResponse>('gallery', {
    params: {
      pageNumber: page,
      pageSize,
      status,
      type,
    },
  });
};

export const getGalleryFile = (id: string | null) => {
  return authInstance.get<IGalleryFile>(`gallery/${id}`);
};

export const updateGalleryFile = (id: string | null, form: any) => {
  return authInstance.put(`gallery/${id}`, form);
};

export const deleteGalleryFile = async (id: string | undefined) => {
  return authInstance.delete(`gallery/${id}`);
};
