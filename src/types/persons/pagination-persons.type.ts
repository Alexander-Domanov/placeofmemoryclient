import { IPagination } from '@/types';

/**
 * Condition for filter.
 */
export enum FilterCondition {
  /**
   * Corresponds to values that are less than or equal to the specified value.
   * @example: birthDate <= 1990-01-01
   */
  lte = 'lte',
  /**
   * Corresponds to values that are greater than or equal to the specified value.
   * @example: birthDate >= 1990-01-01
   */
  gte = 'gte',
}

export interface IPaginationPersons extends IPagination {
  lastName: string;
  country: string;
  city: string;
  birthYear?: string | null;
  deathYear?: string | null;
  filterConditionBirthDate?: FilterCondition;
  filterConditionDeathDate?: FilterCondition;
}
