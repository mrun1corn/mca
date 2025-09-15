import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../../theme';

export default function ThemeInput({ style, ...props }: TextInputProps) {
  const { colors } = useTheme();
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.textDim}
      style={[{ color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 }, style]}
    />
  );
}

