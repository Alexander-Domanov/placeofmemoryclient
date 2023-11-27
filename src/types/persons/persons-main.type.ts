export interface IGetPersonsPublicParams {
  pageSize?: number;
  pageNumber?: number;
  lang?: string;
  name?: string;
  lastName?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  deathDate?: string;
  filterConditionBirthDate?: string;
  filterConditionDeathDate?: string;
}
