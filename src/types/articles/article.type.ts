import { IBaseDateType, IBaseOwnerInfo, IGalleryFile } from '@/types';

export interface IArticle extends IBaseDateType, IBaseOwnerInfo {
  status: string;
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  photos: IGalleryFile[];
}
