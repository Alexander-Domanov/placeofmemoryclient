import React from 'react';
import { Typography } from 'antd';

interface QuillCharacterCountProps {
  characterCount: number;
  maxCount: number;
  exceededColor?: string;
}

export const QuillCharacterCount: React.FC<QuillCharacterCountProps> = ({
  characterCount,
  maxCount,
  exceededColor = 'red',
}) => {
  const isCharacterCountExceeded = characterCount > maxCount;

  return (
    <Typography.Text
      style={{
        position: 'absolute',
        bottom: 28,
        right: 26,
        color: isCharacterCountExceeded ? exceededColor : 'rgba(0, 0, 0, 0.45)',
      }}
    >
      {characterCount} / {maxCount}
    </Typography.Text>
  );
};
