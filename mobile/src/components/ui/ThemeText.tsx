import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../theme';

type Variant = 'title' | 'subtitle' | 'body' | 'caption' | 'label';
type Tone = 'default' | 'dim' | 'muted' | 'danger' | 'success' | 'primary';

type Props = TextProps & {
  variant?: Variant;
  tone?: Tone;
};

const variantStyle = (size: number): TextStyle => ({ fontSize: size, lineHeight: size * 1.3 });

export default function ThemeText({ style, variant = 'body', tone = 'default', ...props }: Props) {
  const { colors, typography } = useTheme();
  const fontSizes: Record<Variant, number> = {
    title: typography.title,
    subtitle: typography.subtitle,
    body: typography.body,
    caption: typography.caption,
    label: typography.caption,
  };

  const colorMap: Record<Tone, string> = {
    default: colors.text,
    dim: colors.textDim,
    muted: colors.textMuted,
    danger: colors.danger,
    success: colors.success,
    primary: colors.primary,
  };

  return (
    <Text
      {...props}
      style={[
        variantStyle(fontSizes[variant]),
        { color: colorMap[tone] },
        variant === 'label' ? { fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.4 } : null,
        style,
      ]}
    />
  );
}
