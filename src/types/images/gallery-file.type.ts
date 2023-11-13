import { IBaseOwnerInfo, IFileVersions, IVersionsType } from '@/types';

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
