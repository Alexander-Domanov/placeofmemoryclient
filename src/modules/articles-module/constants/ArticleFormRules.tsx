import { LocaleType } from '@/components/internationalization';

export const ArticleFormRules = (t: LocaleType) => ({
  title: [
    {
      required: true,
      message: t.dashboard.articles.form.title.rules.required,
    },
    { max: 155, message: t.dashboard.articles.form.title.rules.max },
  ],
  description: [
    {
      required: true,
      message: t.dashboard.articles.form.description.rules.required,
    },
    {
      max: 355,
      message: t.dashboard.articles.form.description.rules.max,
    },
  ],
  content: {
    rules: [
      {
        required: true,
        message: t.dashboard.articles.form.content.rules.required,
      },
    ],
    maxCharacters: 10000,
    message: t.dashboard.articles.form.content.rules.max,
  },
  slug: [
    {
      required: true,
      message: t.dashboard.rules.slug.rules.required,
    },
    { max: 120, message: t.dashboard.rules.slug.rules.max },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: t.dashboard.rules.slug.rules.pattern,
    },
  ],
  photo: {
    rules: [
      {
        required: true,
        message: t.dashboard.articles.form.photo.rules.required,
      },
    ],
    maxCount: 1,
  },
});
