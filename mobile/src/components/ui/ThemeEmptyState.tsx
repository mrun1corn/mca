import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeText from './ThemeText';

interface ThemeEmptyStateProps {
  title?: string;
  message: string;
  icon?: ReactNode;
}

export default function ThemeEmptyState({ title, message, icon }: ThemeEmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {title && (
        <ThemeText variant="subtitle" style={styles.title}>
          {title}
        </ThemeText>
      )}
      <ThemeText tone="dim" style={styles.message}>
        {message}
      </ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginBottom: 12,
    opacity: 0.8,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
});
