import React from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { useTheme } from '../../theme';

type Props = ViewProps & {
  scroll?: boolean;
  children: React.ReactNode;
  inset?: 'none' | 'small' | 'medium';
};

export default function Screen({ scroll = false, inset = 'medium', style, children, ...props }: Props) {
  const { colors } = useTheme();
  const padding = inset === 'none' ? 0 : inset === 'small' ? 12 : 16;
  const baseStyle = [{ flex: 1, backgroundColor: colors.bg }, style];

  if (scroll) {
    return (
      <ScrollView
        style={baseStyle as any}
        contentContainerStyle={{ padding, paddingBottom: padding + 40 }}
        keyboardShouldPersistTaps="handled"
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[{ flex: 1, backgroundColor: colors.bg, padding, paddingBottom: padding + 12 }, style]} {...props}>
      {children}
    </View>
  );
}
