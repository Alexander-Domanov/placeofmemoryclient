import { authInstance } from '@/services';
import { IArticle, IArticleCreate } from '@/types/articles/article.type';
import { IGetArticlesResponse } from '@/types/articles/get-articles-response.type';

export const createArticle = (form: IArticleCreate) => {
  return authInstance.post<IArticle>('articles', form);
};

export const getArticles = (
  page: number,
  pageSize: number,
  status: string,
  title: string,
  sorting: { field: string | null | number | bigint; order: string | null }
) => {
  return authInstance.get<IGetArticlesResponse>('articles', {
    params: {
      pageNumber: page,
      pageSize,
      status,
      title,
      sortBy: sorting.field,
      sortDirection: sorting.order,
    },
  });
};

export const getArticle = async (id: string) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1337);
    }, 2000);
  });

  return authInstance.get<IArticle>(`articles/${id}`);
};

export const updateArticleStatus = (id: number | null, status: string) => {
  return authInstance.put(`articles/${id}/status`, { status });
};

export const deleteArticle = (id: number | null) => {
  return authInstance.delete(`articles/${id}`);
};
