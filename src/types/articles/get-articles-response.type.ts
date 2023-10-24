import { IGetPaginationResponse } from '@/types/common/get-pagination-response.type';
import { IArticle } from '@/types/articles/article.type';

export interface IGetArticlesResponse
  extends IGetPaginationResponse<IArticle[]> {}
