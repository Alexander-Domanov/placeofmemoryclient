import { IBaseImage } from '@/types';

/**
 * @description Avatar versions
 * @description THUMBNAIL: 45x45
 * @description MEDIUM: 350x350
 */
export interface IAvatarVersions {
  /** @description default size [ width: 45, height: 45 ] */
  thumbnail: IBaseImage;
  /** @description default size [ width: 350, height: 350 ] */
  medium: IBaseImage;
}
