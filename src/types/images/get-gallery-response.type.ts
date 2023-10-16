import { IGalleryFile } from '@/types';
import { IGetPaginationResponse } from '@/types/common/get-pagination-response.type';

export interface IGetGalleryResponse
  extends IGetPaginationResponse<IGalleryFile[]> {}
