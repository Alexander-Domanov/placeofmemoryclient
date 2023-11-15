interface IThumbnail {
  url: string;
  fileName: string;
  width: number;
  height: number;
  fileSize: string;
}

interface IMedium {
  url: string;
  fileName: string;
  width: number;
  height: number;
  fileSize: string;
}

interface IAvatars {
  thumbnail: IThumbnail;
  medium: IMedium;
}

interface IOwner {
  id: number;
  userName: string;
  avatars: IAvatars;
}

interface ILocation {
  place: string;
  lat: number;
  lng: number;
}

interface IVersions {
  huge: IThumbnail;
  large: IThumbnail;
}

interface IPhotos {
  typeFile: string;
  uploadId: string;
  owner: IOwner;
  status: string;
  mime: string;
  subType: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
  versions: IVersions;
}

interface IPersonsLocation {
  status: string;
  id: number;
  owner: IOwner;
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
  deathDate: string;
  biography: string;
  location: Location;
  place: {
    id: number;
    name: string;
    formattedAddress: string;
  };
  slug: string;
  photos: IPhotos[];
  createdAt: string;
  updatedAt: string;
}

interface IPlacesMain {
  status: string;
  id: number;
  owner: IOwner;
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  location: Location;
  photos: IPhotos[];
  personsLocation: IPersonsLocation[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface IPlacesMainPagination {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
}

interface IPlacesMainResponse extends IPlacesMainPagination {
  items: IPlacesMain[];
}

interface IPlacesProps {
  lang?: string;
  name?: string;
  country?: string;
  city?: string;
  pageNumber?: number;
  pageSize?: number;
  slug?: string;
}

export type { IPlacesMainResponse, IPlacesMain, IPlacesProps };
