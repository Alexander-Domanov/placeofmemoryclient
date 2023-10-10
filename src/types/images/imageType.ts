export interface AvatarType {
  versions: Versions;
}

interface Versions {
  thumbnail: GeneralImage;
  medium: GeneralImage;
}

interface GeneralImage {
  url: string;
  fileName: string;
  width: string;
  height: string;
  fileSize: string;
}
