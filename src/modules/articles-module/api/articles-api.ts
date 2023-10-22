import { authInstance } from '@/services';
import { IArticleCreate } from '@/types/articles/article.type';

export const createArticle = (form: IArticleCreate) => {
  return authInstance.post('articles', form);
};
