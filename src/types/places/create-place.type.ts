export interface ICreatePlace {
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  ids: string[];
  location: {
    name: string;
    longitude: number;
    latitude: number;
  };
}
