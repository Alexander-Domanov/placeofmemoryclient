import { authInstance } from '@/services';
import { IGalleryFile } from '@/types/images/gallery-file.type';
import { IGetGalleryResponse } from '@/types/images/get-gallery-response.type';

export const getGallery = (page: number, pageSize: number, status: string) => {
  return authInstance.get<IGetGalleryResponse>('gallery', {
    params: {
      pageNumber: page,
      pageSize,
      status,
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
