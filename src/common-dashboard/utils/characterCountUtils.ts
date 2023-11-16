interface CharacterCountUtils {
  isCharacterCountExceeded: (
    characterCount: number,
    maxCount: number
  ) => boolean;
  getQuillStyle: (isExceeded: boolean) => React.CSSProperties;
}

export const characterCountUtils: CharacterCountUtils = {
  isCharacterCountExceeded: (characterCount, maxCount) =>
    characterCount > maxCount,
  getQuillStyle: (isExceeded) => ({
    border: isExceeded ? '1px solid red' : '1px solid #d9d9d9',
  }),
};
