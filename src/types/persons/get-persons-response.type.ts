import { IGetPaginationResponse } from '@/types/common/get-pagination-response.type';
import { IPerson } from '@/types';

export interface IGetPersonsResponse
  extends IGetPaginationResponse<IPerson[]> {}
