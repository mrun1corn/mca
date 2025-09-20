import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

type Props = PressableProps & {
  variant?: Variant;
  size?: Size;
  title: string;
  leftIcon?: React.ReactNode;
};

export default function ThemeButton({
  variant = 'primary',
  size = 'md',
  title,
  leftIcon,
  style,
  disabled,
  ...props
}: Props) {
  const { colors } = useTheme();

  const bg: Record<Variant, string> = {
    primary: colors.primary,
    secondary: colors.surface,
    ghost: 'transparent',
    danger: colors.danger,
  };

  const textColor: Record<Variant, string> = {
    primary: colors.onPrimary,
    secondary: colors.text,
    ghost: colors.primary,
    danger: colors.onPrimary,
  };

  const border: Record<Variant, string> = {
    primary: colors.primary,
    secondary: colors.border,
    ghost: 'transparent',
    danger: colors.danger,
  };

  const padding: Record<Size, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
    sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: 14 },
    md: { paddingVertical: 12, paddingHorizontal: 18, fontSize: 16 },
  };

  const sizeStyle = padding[size];

  const pressableStyle = ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const dynamic: ViewStyle = {
      backgroundColor: bg[variant],
      borderColor: border[variant],
      opacity: disabled ? 0.5 : 1,
      transform: pressed ? [{ scale: 0.98 }] : undefined,
      paddingVertical: sizeStyle.paddingVertical,
      paddingHorizontal: sizeStyle.paddingHorizontal,
    };
    const extra: StyleProp<ViewStyle>[] = [
      variant === 'secondary' ? { shadowOpacity: 0 } : null,
      style,
    ].filter(Boolean) as StyleProp<ViewStyle>[];
    return [styles.base, dynamic, ...extra];
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={pressableStyle}
      {...props}
    >
      <View style={styles.content}>
        {leftIcon ? <View style={{ marginRight: 8 }}>{leftIcon}</View> : null}
        <Text
          style={[
            styles.title,
            { color: textColor[variant], fontSize: sizeStyle.fontSize },
            variant === 'ghost' ? { fontWeight: '600' } : null,
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
