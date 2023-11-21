export const PersonFormRules = {
  firstName: [
    { required: true },
    { max: 120, message: `First name limit is 120 characters` },
    { whitespace: true },
  ],
  lastName: [
    { required: true },
    { max: 120, message: `Last name limit is 120 characters` },
    { whitespace: true },
  ],
  patronymic: [
    { whitespace: true },
    { max: 120, message: `Patronymic limit is 120 characters` },
  ],
  biography: {
    rules: [],
    maxCharacters: 500,
    message: `Biography limit is 500 characters`,
  },
  country: [
    { required: true },
    { max: 120, message: `Country limit is 120 characters` },
    { whitespace: true },
  ],
  city: [
    { required: true },
    { max: 120, message: `City limit is 120 characters` },
    { whitespace: true },
  ],
  location: [{ required: true }],
  slug: [
    { required: true },
    { max: 120, message: `Slug limit is 120 characters` },
    {
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: `Lowercase letters and hyphens only.`,
    },
  ],
  photo: {
    rules: [{ required: true }],
    maxCount: 3,
  },
};
