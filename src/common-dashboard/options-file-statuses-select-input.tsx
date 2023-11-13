import { FileStatuses, ImageResourceType } from '@/types';

export const fileStatusOptions = [
  { label: 'All', value: FileStatuses.ALL },
  { label: 'Draft', value: FileStatuses.DRAFT },
  { label: 'PendingReview', value: FileStatuses.PENDING_REVIEW },
  { label: 'Published', value: FileStatuses.PUBLISHED },
];

export const typeFileOptions = [
  { label: 'All', value: ImageResourceType.ALL },
  { label: 'Articles', value: ImageResourceType.ARTICLE },
  { label: 'Persons', value: ImageResourceType.PERSON },
  { label: 'Places', value: ImageResourceType.PLACE },
  // { label: 'Common', value: ImageResourceType.COMMON },
];
