import { IUser } from '@/types/users/user.type';
import { IGetPaginationResponse } from '@/types/common/get-pagination-response.type';

export interface IGetUsersResponse extends IGetPaginationResponse<IUser[]> {
  items: IUser[];
}
