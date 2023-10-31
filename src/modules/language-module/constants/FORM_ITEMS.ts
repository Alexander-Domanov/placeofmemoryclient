export const REG_FORM_NUMBER = /^[0-9]+$/;
export const REG_FORM_TEXT = /^[a-zA-Z]+$/;
export const REG_FORM_LOWER_TEXT = /^[a-z]+$/;

export const FORM_ITEMS = [
  {
    label: 'Name',
    name: 'name',
    rules: [
      {
        required: true,
        message: 'Please input the language name!',
      },
      {
        pattern: REG_FORM_TEXT,
        message: 'Language name must contain only text!',
      },
    ],
    placeholder: 'Name',
  },
  {
    label: 'Native',
    name: 'native',
    rules: [
      {
        required: true,
        message: 'Please input the native language!',
      },
      {
        pattern: REG_FORM_TEXT,
        message: 'Language name must contain only text!',
      },
    ],
    placeholder: 'Native',
  },
  {
    label: 'Code',
    name: 'code',
    rules: [
      {
        required: true,
        message: 'Please input the language code!',
      },
      {
        pattern: REG_FORM_TEXT,
        message: 'Language name must contain only text!',
      },

      {
        pattern: REG_FORM_LOWER_TEXT,
        message: 'Code must contain only lowercase letters!',
      },
      {
        max: 2,
        message: 'Code must be 2 characters or less!',
      },
    ],

    placeholder: 'Code',
  },
  {
    label: 'Order',
    name: 'order',
    rules: [
      {
        required: true,
        message: 'Please enter the order number for the language in the list',
      },
      {
        pattern: REG_FORM_NUMBER,
        message: 'Language name must contain only number!',
      },
    ],
    placeholder: 'Order',
  },
];
