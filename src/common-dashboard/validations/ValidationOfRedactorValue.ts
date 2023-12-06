interface Imessage {
  rules: {
    required?: string;
    max: string;
  };
}
interface IContentValidationOptions {
  maxCharacters: number;
  message: Imessage;
  value: string;
  callback: (message?: string) => void;
  isCanEmpty?: boolean;
}

export const ValidationOfRedactorValue = (
  options: IContentValidationOptions
) => {
  const {
    value,
    maxCharacters,
    message,
    callback,
    isCanEmpty = false,
  } = options;

  const contentWithoutTags = (value as string)?.replace(/<[^>]*>/g, '') || '';
  const isEmptyContent = (value as string)?.trim() === '<p><br></p>';

  const isExceeded = contentWithoutTags.length > maxCharacters;

  if (isExceeded) {
    callback(message.rules.max);
  } else if (isEmptyContent && !isCanEmpty) {
    callback(message.rules.required);
  } else {
    callback();
  }
};
