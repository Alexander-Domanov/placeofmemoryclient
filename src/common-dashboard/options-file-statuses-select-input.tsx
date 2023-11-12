import { FileStatuses } from '@/types';

export const fileStatusOptions = [
  { label: 'All', value: FileStatuses.ALL },
  { label: 'Draft', value: FileStatuses.DRAFT },
  { label: 'PendingReview', value: FileStatuses.PENDING_REVIEW },
  { label: 'Published', value: FileStatuses.PUBLISHED },
];
