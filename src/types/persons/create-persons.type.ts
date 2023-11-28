export interface ICreatePerson {
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
  birthDay: number | null;
  birthMonth: number | null;
  birthYear: number | null;
  deathDay: number | null;
  deathMonth: number | null;
  deathYear: number | null;
  country: string;
  city: string;
  ids: string[];
  placeId: number | null;
  location: {
    place: string | null;
    lng: number | null;
    lat: number | null;
  };
  slug?: string;
}
