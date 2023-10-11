import { IFileVersions, IVersionsType } from '@/types';

export interface IGalleryFile extends IVersionsType<IFileVersions> {
  typeFile: string;
  uploadId: string;
  status: string;
  mime: string;
  subType: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
}
