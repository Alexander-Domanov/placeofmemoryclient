import { IFileVersions, IVersionsType } from '@/types';
import { IBaseOwnerInfo } from '@/types/common/owner-info.type';

export interface IGalleryFile
  extends IVersionsType<IFileVersions>,
    IBaseOwnerInfo {
  typeFile: string;
  uploadId: string;
  status: string;
  mime: string;
  subType: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
}
