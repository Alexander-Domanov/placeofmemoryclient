export const ArticleFormRules = {
  title: [
    { required: true },
    { max: 155, message: `Title limit is 155 characters` },
  ],
  description: [
    { required: true },
    { max: 355, message: `Description limit is 355 characters` },
  ],
  content: [
    { required: true },
    { max: 10000, message: `Content limit is 10000 characters` },
  ],
  slug: [
    { required: true },
    { max: 120, message: `Slug limit is 120 characters` },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: `Slug should be in lower case and separated by hyphens`,
    },
  ],
  photo: {
    rules: [{ required: true }],
    maxFileSize: 1,
  },
};
