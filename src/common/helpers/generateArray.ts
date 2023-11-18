export const generateArray = (start: number, end: number) => {
  const result = [];

  // eslint-disable-next-line no-plusplus
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};
