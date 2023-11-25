import { LocaleType } from '@/components/internationalization';

interface IContentValidationOptions {
  maxCharacters: number;
  message: string;
  value: string;
  callback: (message?: string) => void;
  t: LocaleType;
}

export const ValidationOfRedactorValue = (
  options: IContentValidationOptions
) => {
  const { value, maxCharacters, message, callback, t } = options;
  const contentWithoutTags = (value as string)?.replace(/<[^>]*>/g, '') || '';
  const isEmptyContent = (value as string)?.trim() === '<p><br></p>';

  const isExceeded = contentWithoutTags.length > maxCharacters;

  if (isExceeded) {
    callback(message);
  } else if (isEmptyContent) {
    callback(`${t.dashboard.rules.required} ${message.split(' ')[0]}`);
  } else {
    callback();
  }
};
