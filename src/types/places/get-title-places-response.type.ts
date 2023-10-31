import { IGetPaginationResponse } from '@/types/common/get-pagination-response.type';
import { ITitlePlace } from '@/types/places/title-place.type';

export interface IGetTitlePlacesResponse
  extends IGetPaginationResponse<ITitlePlace[]> {}
