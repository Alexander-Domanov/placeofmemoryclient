import { IBaseDateType, IGalleryFile } from '@/types';
import { IBaseOwnerInfo } from '@/types/common/owner-info.type';

export interface IArticle extends IBaseDateType, IBaseOwnerInfo {
  status: string;
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  photos: IGalleryFile[];
}
