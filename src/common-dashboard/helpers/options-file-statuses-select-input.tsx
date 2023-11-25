import { FileStatuses, ImageResourceType } from '@/types';
import { LocaleType } from '@/components/internationalization';

export const FileStatusOptions = (t: LocaleType) => [
  { label: t.dashboard.selectStatus.all, value: FileStatuses.ALL },
  { label: t.dashboard.selectStatus.draft, value: FileStatuses.DRAFT },
  {
    label: t.dashboard.selectStatus.pending,
    value: FileStatuses.PENDING_REVIEW,
  },
  { label: t.dashboard.selectStatus.published, value: FileStatuses.PUBLISHED },
];

export const TypeFileOptions = (t: LocaleType) => [
  { label: t.dashboard.selectFileType.all, value: ImageResourceType.ALL },
  {
    label: t.dashboard.selectFileType.articles,
    value: ImageResourceType.ARTICLE,
  },
  { label: t.dashboard.selectFileType.people, value: ImageResourceType.PERSON },
  { label: t.dashboard.selectFileType.places, value: ImageResourceType.PLACE },
  // { label: 'Common', value: ImageResourceType.COMMON },
];
