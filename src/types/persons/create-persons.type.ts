export interface ICreatePerson {
  name: string;
  lastName: string;
  patronymic: string;
  biography: string;
  birthDate: Date;
  deathDate: Date;
  ids: string[];
  slug: string;
  placeId: number | null;
  location: {
    place: string | null;
    lng: number | null;
    lat: number | null;
  };
}
