import { LocaleType } from '@/components/internationalization';

export const PlaceFormRules = (t: LocaleType) => ({
  country: [
    {
      required: true,
      message: t.dashboard.places.form.country.rules.required,
    },
    { max: 120, message: t.dashboard.places.form.country.rules.max },
    { whitespace: true },
  ],
  city: [
    {
      required: true,
      message: t.dashboard.places.form.city.rules.required,
    },
    { max: 120, message: t.dashboard.places.form.city.rules.max },
    { whitespace: true },
  ],
  nameCemetery: [
    {
      required: true,
      message: t.dashboard.places.form.nameCemetery.rules.required,
    },
    {
      max: 120,
      message: t.dashboard.places.form.nameCemetery.rules.max,
    },
  ],
  shortDescription: {
    rules: [
      {
        required: true,
        message: t.dashboard.places.form.shortDescription.rules.required,
      },
    ],
    maxCharacters: 300,
    message: t.dashboard.places.form.shortDescription.rules.max,
  },
  description: {
    rules: [
      {
        required: true,
        message: t.dashboard.places.form.description.rules.required,
      },
    ],
    maxCharacters: 5000,
    message: t.dashboard.places.form.description.rules.max,
  },
  location: [
    {
      required: true,
      message: t.dashboard.locationInfo.rules.required,
    },
  ],
  slug: [
    { required: true, message: t.dashboard.rules.slug.rules.required },
    { max: 120, message: t.dashboard.rules.slug.rules.max },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: t.dashboard.rules.slug.rules.pattern,
    },
  ],
  photo: {
    rules: [{ required: true }],
    maxCount: 1,
  },
});
