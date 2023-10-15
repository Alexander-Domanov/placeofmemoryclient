import { IBaseDateType } from '@/types';

export interface ISimpleOverview extends IBaseDateType {
  id: number;
  status: string;
}

export interface ISummaryStatusGroupDto {
  drafts: ISimpleOverview[];
  pendingReview: ISimpleOverview[];
  publications: ISimpleOverview[];
}
