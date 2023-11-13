import { IGetPaginationResponse, IPerson } from '@/types';

export interface IGetPersonsResponse
  extends IGetPaginationResponse<IPerson[]> {}
