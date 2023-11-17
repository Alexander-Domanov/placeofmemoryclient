interface IContentValidationOptions {
  maxCharacters: number;
  message: string;
  value: string;
  callback: (message?: string) => void;
}

export const ValidationOfRedactorValue = (
  options: IContentValidationOptions
) => {
  const { value, maxCharacters, message, callback } = options;
  const contentWithoutTags = (value as string)?.replace(/<[^>]*>/g, '') || '';
  const isEmptyContent = (value as string)?.trim() === '<p><br></p>';

  const isExceeded = contentWithoutTags.length > maxCharacters;

  if (isExceeded) {
    callback(message);
  } else if (isEmptyContent) {
    callback(`Please enter ${message.split(' ')[0]}`);
  } else {
    callback();
  }
};
