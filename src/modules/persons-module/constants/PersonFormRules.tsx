import { LocaleType } from '@/components/internationalization';

export const PersonFormRules = (t: LocaleType) => ({
  firstName: [
    { required: true, message: t.dashboard.persons.form.name.rules.required },
    { max: 120, message: t.dashboard.persons.form.name.rules.max },
    { whitespace: true },
  ],
  lastName: [
    {
      required: true,
      message: t.dashboard.persons.form.lastName.rules.required,
    },
    { max: 120, message: t.dashboard.persons.form.lastName.rules.max },
    { whitespace: true },
  ],
  patronymic: [
    { whitespace: true },
    { max: 120, message: t.dashboard.persons.form.patronymic.rules.max },
  ],
  biography: {
    rules: [],
    maxCharacters: 500,
    message: t.dashboard.persons.form.biography.rules.max,
  },
  country: [
    {
      required: true,
      message: t.dashboard.persons.form.country.rules.required,
    },
    { max: 120, message: t.dashboard.persons.form.country.rules.max },
    { whitespace: true },
  ],
  city: [
    { required: true, message: t.dashboard.persons.form.city.rules.required },
    { max: 120, message: t.dashboard.persons.form.city.rules.max },
    { whitespace: true },
  ],
  location: [
    {
      required: true,
      message: t.dashboard.locationInfo.rules.required,
    },
  ],
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
        message: t.dashboard.persons.form.photo.rules.required,
      },
    ],
    maxCount: 3,
  },
});
