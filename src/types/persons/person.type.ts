import { ILocation } from '@/types/locations/location.type';
import { IGalleryFile } from '@/types/images/gallery-file.type';
import { IBaseOwnerInfo } from '@/types/common/owner-info.type';
import { IBaseDateType } from '@/types';

export interface IPerson extends ILocation, IBaseDateType, IBaseOwnerInfo {
  status: string;
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  deathDate: string;
  description: string;
  slug: string;
  photos: IGalleryFile[];
  createdAt: string;
}
