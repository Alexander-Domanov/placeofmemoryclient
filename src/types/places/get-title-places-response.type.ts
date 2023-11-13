import { IGetPaginationResponse, ITitlePlace } from '@/types';

export interface IGetTitlePlacesResponse
  extends IGetPaginationResponse<ITitlePlace[]> {}
