export interface ILocation {
  place: string;
  latitude: number | null;
  longitude: number | null;
}

export interface IBaseLocation {
  location: ILocation;
}
