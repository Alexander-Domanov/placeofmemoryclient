const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '');
};

export const GetCharacterCount = (text: string) => {
  return stripHtmlTags(text).length;
};
