import { IGetPaginationResponse } from '@/types/common/get-pagination-response.type';
import { IPlace } from '@/types';

export interface IGetPlacesResponse extends IGetPaginationResponse<IPlace[]> {}
