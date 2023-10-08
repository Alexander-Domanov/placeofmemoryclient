import { authInstance } from '@/services';

interface GalleryItem {
  uploadId: string;
  versions: {
    huge: {
      url: string;
      width: number;
      height: number;
      fileSize: number;
    };
    large: {
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
  items: GalleryItem[];
}

export const getGallery = (page: number) => {
  return authInstance.get<GetGalleryResponse>('gallery', {
    params: {
      pageNumber: page,
    },
  });
};
