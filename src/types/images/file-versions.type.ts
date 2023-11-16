import { IBaseImage } from '@/types';

/**
 * @description File versions
 * @description HUGE: 1440x1440, 1152x1440, 1440x810
 * @description LARGE: 360x360, 360x450, 360x202
 * @description MEDIUM: 192x192, 192x240, 192x108
 */
export interface IFileVersions {
  /**
   * @description Size:
   * @description [ width: 1440, height: 1440, ratio: 1:1 ]
   * @description [ width: 1152, height: 1440, ratio: 4:5 ]
   * @description [ width: 1440, height: 810, ratio: 16:9 ]
   */
  huge: IBaseImage;
  /** @description Size:
   * @description [ width: 360, height: 360, ratio: 1:1 ]
   * @description [ width: 360, height: 450, ratio: 4:5 ]
   * @description [ width: 360, height: 202, ratio: 16:9 ]
   */
  large: IBaseImage;
  /**
   * @description Size:
   * @description  [ width: 192, height: 192, ratio: 1:1 ]
   * @description [ width: 192, height: 240, ratio: 4:5 ]
   * @description [ width: 192, height: 108, ratio: 16:9 ]
   * */
  medium: IBaseImage;
}
