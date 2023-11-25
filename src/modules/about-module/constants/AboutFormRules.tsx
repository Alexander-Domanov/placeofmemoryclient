import { LocaleType } from '@/components/internationalization';

export const AboutFormRules = (t: LocaleType) => ({
  about: {
    rules: [
      {
        required: true,
        message: t.dashboard.contacts.form.about.rules.required,
      },
    ],
    maxCharacters: 10000,
    message: t.dashboard.contacts.form.about.rules.max,
  },
});
