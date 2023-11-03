import dayjs from 'dayjs';
import { dateTimeFormat } from '@/common/constants';

export const convertDateToFormat = (
  date: string | undefined,
  format = dateTimeFormat
) => {
  const dateTime = dayjs(date);

  if (dateTime.isValid()) {
    return dateTime.format(format);
  }

  return null;
};
