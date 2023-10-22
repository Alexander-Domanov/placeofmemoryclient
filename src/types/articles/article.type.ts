import { IGalleryFile } from '@/types/images/gallery-file.type';
import { IBaseDateType } from '@/types/common/base-date.type';

export interface IArticle extends IBaseDateType {
  status: string;
  id: number;
  title: string;
  description: string;
  content: string;
  photos: IGalleryFile[];
}

export interface IArticleCreate {
  title: string;
  description: string;
  content: string;
  ids: string[];
}
