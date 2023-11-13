import { IGetPaginationResponse, IUserWithShortExtensions } from '@/types';

export interface IGetUsersResponse
  extends IGetPaginationResponse<IUserWithShortExtensions[]> {}
