import { authInstance } from '@/services';
import { IArticle } from '@/types/articles/article.type';
import { IGetArticlesResponse } from '@/types/articles/get-articles-response.type';
import { IArticleCreate } from '@/types/articles/create-articles.type';

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
  return authInstance.get<IArticle>(`articles/${id}`);
};

export const updateArticle = (id: string, form: IArticleCreate) => {
  return authInstance.put<IArticle>(`articles/${id}`, form);
};

export const updateArticleStatus = (id: number | null, status: string) => {
  return authInstance.put(`articles/${id}/status`, { status });
};

export const deleteArticle = (id: number | null) => {
  return authInstance.delete(`articles/${id}`);
};
