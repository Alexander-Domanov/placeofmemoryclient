import { authInstance } from '@/services';

export interface GalleryFile {
  typeFile: string;
  uploadId: string;
  status: string;
  mime: string;
  subType: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
  versions?: {
    huge?: {
      url: string;
      width: number;
      height: number;
      fileSize: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
      fileSize: number;
    };
  };
}

interface GetGalleryResponse {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: GalleryFile[];
}

export const getGallery = (page: number, pageSize: number, status: string) => {
  return authInstance.get<GetGalleryResponse>('gallery', {
    params: {
      pageNumber: page,
      pageSize,
      status,
    },
  });
};

export const getGalleryFile = (id: string | null) => {
  return authInstance.get<GalleryFile>(`gallery/${id}`);
};

export const deleteGalleryFile = (id: string | undefined) => {
  return authInstance.delete(`gallery/${id}`);
};
