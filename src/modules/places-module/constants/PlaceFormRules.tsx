export const PlaceFormRules = {
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
  nameCemetery: [
    { required: true },
    { max: 120, message: `Name Cemetery limit is 120 characters` },
  ],
  shortDescription: {
    rules: [{ required: true }],
    maxCharacters: 300,
    message: `Short Description limit is 300 characters`,
  },
  description: {
    rules: [{ required: true }],
    maxCharacters: 5000,
    message: `Description limit is 5000 characters`,
  },
  location: [{ required: true }],
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
