import { LocaleType } from '@/components/internationalization';

const REG_FORM_NUMBER = /^[0-9]+$/;
const REG_FORM_TEXT = /^[a-zA-Z]+$/;
const REG_FORM_NATIVE = /^[\p{L}]+$/u;

export const FORM_ITEMS = (t: LocaleType) => [
  {
    label: t.dashboard.languages.form.name.label,
    name: 'name',
    rules: [
      {
        required: true,
        message: t.dashboard.languages.form.name.rules.required,
      },
      {
        pattern: REG_FORM_TEXT,
        message: t.dashboard.languages.form.name.rules.pattern,
      },
    ],
    placeholder: t.dashboard.languages.form.name.placeholder,
  },
  {
    label: t.dashboard.languages.form.native.label,
    name: 'native',
    rules: [
      {
        required: true,
        message: t.dashboard.languages.form.native.rules.required,
      },
      {
        pattern: REG_FORM_NATIVE,
        message: t.dashboard.languages.form.native.rules.pattern,
      },
    ],
    placeholder: t.dashboard.languages.form.native.placeholder,
  },
  {
    label: t.dashboard.languages.form.code.label,
    name: 'code',
    rules: [
      {
        required: true,
        message: t.dashboard.languages.form.code.rules.required,
      },
      {
        pattern: REG_FORM_TEXT,
        message: t.dashboard.languages.form.code.rules.pattern,
      },

      {
        max: 2,
        message: t.dashboard.languages.form.code.rules.max,
      },
    ],

    placeholder: t.dashboard.languages.form.code.placeholder,
  },
  {
    label: t.dashboard.languages.form.order.label,
    name: 'order',
    rules: [
      {
        required: true,
        message: t.dashboard.languages.form.order.rules.required,
      },
      {
        pattern: REG_FORM_NUMBER,
        message: t.dashboard.languages.form.order.rules.pattern,
      },
    ],
    placeholder: t.dashboard.languages.form.order.placeholder,
  },
];
