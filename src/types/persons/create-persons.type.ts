export interface ICreatePerson {
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
  birthDate: Date;
  deathDate: Date;
  ids: string[];
  placeId: number | null;
  location: {
    place: string | null;
    lng: number | null;
    lat: number | null;
  };
  slug?: string;
}
