import { CSSProperties } from 'react';

interface CharacterCountUtils {
  isCharacterCountExceeded: (
    characterCount: number,
    maxCount: number
  ) => boolean;
  getQuillStyle: (isExceeded: boolean) => CSSProperties;
}

export const characterCountUtils: CharacterCountUtils = {
  isCharacterCountExceeded: (characterCount, maxCount) =>
    characterCount > maxCount,
  getQuillStyle: (isExceeded) => ({
    border: isExceeded ? '1px solid #ff4d4f' : 'none',
  }),
};
