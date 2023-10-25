export interface ILocation {
  place: string;
  lat: number | null;
  lng: number | null;
}

export interface IBaseLocation {
  location: ILocation;
}
