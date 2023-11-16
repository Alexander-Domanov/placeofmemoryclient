export const ArticleFormRules = {
  title: [
    { required: true },
    { max: 155, message: `Title must be at most 155 characters` },
  ],
  description: [
    { required: true },
    { max: 355, message: `Description must be at most 355 characters` },
  ],
  content: [
    { required: true },
    { max: 10000, message: `Content must be at most 10 000 characters` },
  ],
  photo: [{ required: true }, { max: 1, message: `Photo must be at most 1` }],
};
