export interface ICreatePlace {
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  ids: string[];
  slug: string;
  location: {
    place: string | null;
    lng: number | null;
    lat: number | null;
  };
}
