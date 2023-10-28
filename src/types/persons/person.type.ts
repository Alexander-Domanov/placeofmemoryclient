import { ILocation } from '@/types/locations/location.type';
import { IGalleryFile } from '@/types/images/gallery-file.type';

export interface IPerson extends ILocation {
  status: string;
  id: number;
  ownerId: number;
  fillName: string;
  birthDate: string;
  deathDate: string;
  description: string;
  slug: string;
  photos: IGalleryFile[];
  createdAt: string;
}
