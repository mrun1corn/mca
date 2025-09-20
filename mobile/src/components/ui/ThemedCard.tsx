import React from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import ThemeText from './ThemeText';

type Tone = 'default' | 'surface' | 'success' | 'danger' | 'primary';

type Props = {
  title?: string;
  subtitle?: string;
  value?: string | React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  tone?: Tone;
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  accessibilityLabel?: string;
};

export default function ThemedCard({
  title,
  subtitle,
  value,
  icon,
  footer,
  tone = 'default',
  onPress,
  style,
  children,
  accessibilityLabel,
}: Props) {
  const { colors } = useTheme();

  const background: Record<Tone, { backgroundColor: string; borderColor: string; textColor?: string }> = {
    default: { backgroundColor: colors.card, borderColor: colors.border },
    surface: { backgroundColor: colors.surface, borderColor: 'transparent' },
    success: { backgroundColor: colors.successSurface, borderColor: colors.success },
    danger: { backgroundColor: colors.dangerSurface, borderColor: colors.danger },
    primary: { backgroundColor: colors.primary, borderColor: colors.primaryMuted, textColor: colors.onPrimary },
  };

  const palette = background[tone];
  const bodyColor = palette.textColor || colors.text;

  const content = (
    <View>
      {title ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: subtitle || value ? 8 : 0 }}>
          {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
          <ThemeText variant="subtitle" style={{ color: palette.textColor || colors.text, fontWeight: '600' }}>
            {title}
          </ThemeText>
        </View>
      ) : null}
      {subtitle ? (
        <ThemeText tone={palette.textColor ? 'muted' : 'dim'} style={{ marginBottom: value ? 6 : 0 }}>
          {subtitle}
        </ThemeText>
      ) : null}
      {value ? (
        <ThemeText
          variant="title"
          style={{ color: bodyColor, fontWeight: '600', marginBottom: children || footer ? 12 : 0 }}
        >
          {value}
        </ThemeText>
      ) : null}
      {children ? <View style={{ gap: 8 }}>{children}</View> : null}
      {footer ? <View style={{ marginTop: 12 }}>{footer}</View> : null}
    </View>
  );

  const containerStyle: ViewStyle = {
    backgroundColor: palette.backgroundColor,
    borderColor: palette.borderColor,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: tone === 'default' ? 0.08 : 0,
    shadowRadius: tone === 'default' ? 8 : 0,
    shadowOffset: { width: 0, height: tone === 'default' ? 3 : 0 },
    elevation: tone === 'default' ? 2 : 0,
  };

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [containerStyle, pressed ? { transform: [{ scale: 0.98 }] } : null, style]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[containerStyle, style]}>{content}</View>;
}
