import * as yup from 'yup';

const usernameRegex = /^[0-9A-Za-z_-]+$/;

export const settingsSchema = () => {
  return yup.object({
    userName: yup.lazy((value) =>
      !value
        ? yup
            .string()
            .matches(
              usernameRegex,
              'Only allowed characters are 0-9, A-Z, a-z, _, -'
            )
            .required('Username is required')
            .min(6, 'Minimum number of characters 6')
            .max(30, 'Maximum number of characters 30')
            .trim()
        : yup
            .string()
            .min(6, 'Minimum number of characters 6')
            .max(30, 'Maximum number of characters 30')
            .matches(
              usernameRegex,
              'Only allowed characters are 0-9, A-Z, a-z, _, -'
            )
            .trim()
    ),
    city: yup.string().trim(),
  });
};
