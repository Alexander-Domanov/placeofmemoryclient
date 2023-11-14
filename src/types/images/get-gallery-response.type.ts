import { IGalleryFile, IGetPaginationResponse } from '@/types';

export interface IGetGalleryResponse
  extends IGetPaginationResponse<IGalleryFile[]> {}
