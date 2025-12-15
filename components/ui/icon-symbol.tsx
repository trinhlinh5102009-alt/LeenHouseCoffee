import React from 'react';
import { Text } from 'react-native';

type IconSymbolProps = {
  name?: string;      // tên icon (tạm không dùng)
  size?: number;      // kích thước icon
  color?: string;     // màu icon
};

export const IconSymbol = ({ name, size = 24, color = '#000' }: IconSymbolProps) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
      }}
    >
      🔆
    </Text>
  );
};
