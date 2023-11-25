import { LocaleType } from '@/components/internationalization';

export const ArticleFormRules = (t: LocaleType) => ({
  title: [
    {
      required: true,
      message: t.dashboard.articles.create.form.title.rules.required,
    },
    { max: 155, message: t.dashboard.articles.create.form.title.rules.max },
  ],
  description: [
    {
      required: true,
      message: t.dashboard.articles.create.form.description.rules.required,
    },
    {
      max: 355,
      message: t.dashboard.articles.create.form.description.rules.max,
    },
  ],
  content: {
    rules: [
      {
        required: true,
        message: t.dashboard.articles.create.form.content.rules.required,
      },
    ],
    maxCharacters: 10000,
    message: t.dashboard.articles.create.form.content.rules.max,
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
    rules: [
      {
        required: true,
        message: t.dashboard.articles.create.form.photo.rules.required,
      },
    ],
    maxCount: 1,
  },
});
