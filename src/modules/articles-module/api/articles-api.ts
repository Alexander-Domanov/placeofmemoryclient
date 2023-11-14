import axios from 'axios';
import { authInstance } from '@/services';
import {
  IArticle,
  IArticleCreate,
  IGetArticlesResponse,
  IPaginationArticles,
} from '@/types';

export const createArticle = (form: IArticleCreate) => {
  return authInstance.post<IArticle>('articles', form);
};

export const getArticles = (data: IPaginationArticles) => {
  return authInstance.get<IGetArticlesResponse>('articles', {
    params: {
      ...data,
      sortBy: data.sorting.field,
      sortDirection: data.sorting.order,
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

export const getArticlesPublic = () => {
  return axios.get<IGetArticlesResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/articles/public/all`,
    {
      params: {
        pageSize: 4,
        status: 'published',
      },
    }
  );
};
