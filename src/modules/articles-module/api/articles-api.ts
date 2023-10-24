import { authInstance } from '@/services';
import { IArticle, IArticleCreate } from '@/types/articles/article.type';

export const createArticle = (form: IArticleCreate) => {
  return authInstance.post<IArticle>('articles', form);
};
