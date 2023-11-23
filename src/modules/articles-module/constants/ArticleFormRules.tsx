export const ArticleFormRules = {
  title: [
    { required: true },
    { max: 155, message: `Title limit is 155 characters` },
  ],
  description: [
    { required: true },
    { max: 355, message: `Description limit is 355 characters` },
  ],
  content: {
    rules: [{ required: true }],
    maxCharacters: 10000,
    message: `Content limit is 10000 characters`,
  },
  slug: [
    { required: true },
    { max: 120, message: `Slug limit is 120 characters` },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: `Lowercase letters, numbers and hyphens are allowed`,
    },
  ],
  photo: {
    rules: [{ required: true }],
    maxCount: 1,
  },
};
