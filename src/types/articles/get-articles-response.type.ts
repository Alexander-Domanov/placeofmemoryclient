import { IArticle, IGetPaginationResponse } from '@/types';

export interface IGetArticlesResponse
  extends IGetPaginationResponse<IArticle[]> {}
