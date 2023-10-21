import { ILocation } from '@/types/locations/location.type';
import { IGalleryFile } from '@/types/images/gallery-file.type';
import { IBaseDateType } from '@/types/common/base-date.type';

export interface IPlace extends ILocation, IBaseDateType {
  id: number;
  status: string;
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  photos: IGalleryFile[];
  personsLocation: IGalleryFile[];
}
