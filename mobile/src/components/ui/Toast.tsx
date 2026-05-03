import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Pressable } from 'react-native';
import ThemeText from './ThemeText';
import { useTheme } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ToastType = 'success' | 'error' | 'info';

type ToastMessage = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: -100, duration: 200, useNativeDriver: true }),
    ]).start(() => setToast(null));
  }, [fadeAnim, slideAnim]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setToast({ id: Date.now(), message, type });
    
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();

    timerRef.current = setTimeout(hideToast, 4000);
  }, [fadeAnim, slideAnim, hideToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              backgroundColor: colors.card,
              borderBottomColor: typeColor(toast.type, colors),
            },
          ]}
        >
          <Pressable onPress={hideToast} style={styles.content}>
            <Ionicons
              name={typeIcon(toast.type)}
              size={20}
              color={typeColor(toast.type, colors)}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <ThemeText style={{ fontWeight: '600' }}>{toast.message}</ThemeText>
            </View>
          </Pressable>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

function typeIcon(type: ToastType) {
  switch (type) {
    case 'success': return 'checkmark-circle';
    case 'error': return 'alert-circle';
    default: return 'information-circle';
  }
}

function typeColor(type: ToastType, colors: any) {
  switch (type) {
    case 'success': return colors.success;
    case 'error': return colors.danger;
    default: return colors.primary;
  }
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    borderRadius: 12,
    padding: 16,
    borderBottomWidth: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
