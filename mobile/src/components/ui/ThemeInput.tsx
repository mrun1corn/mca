import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../../theme';

export default function ThemeInput({ style, ...props }: TextInputProps) {
  const { colors } = useTheme();
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.textMuted}
      style={[
        {
          color: colors.text,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 14,
        },
        style,
      ]}
    />
  );
}
