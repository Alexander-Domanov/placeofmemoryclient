export const FORM_ITEMS = [
  {
    label: 'Name',
    name: 'name',
    rules: [{ required: true, message: 'Please input the language name!' }],
    placeholder: 'Name',
  },
  {
    label: 'Native',
    name: 'native',
    rules: [{ required: true, message: 'Please input the native language!' }],
    placeholder: 'Native',
  },
  {
    label: 'Code',
    name: 'code',
    rules: [{ required: true, message: 'Please input the language code!' }],
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
    ],
    placeholder: 'Order',
  },
];
