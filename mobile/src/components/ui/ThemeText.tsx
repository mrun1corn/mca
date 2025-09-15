import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../theme';

export default function ThemeText({ style, ...props }: TextProps) {
  const { colors } = useTheme();
  return <Text {...props} style={[{ color: colors.text }, style]} />;
}

