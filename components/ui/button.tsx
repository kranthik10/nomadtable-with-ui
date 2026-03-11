import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[size],
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          styles[`${size}Text` as keyof typeof styles],
          variant === 'primary' && styles.primaryText,
          variant === 'secondary' && styles.secondaryText,
          variant === 'outline' && styles.outlineText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Sizes
  small: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 80,
  },
  medium: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 120,
  },
  large: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    minWidth: 160,
  },
  
  // Variants
  primary: {
    backgroundColor: '#E85A8A', // Pink color from the image
    shadowColor: '#E85A8A',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  secondary: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E85A8A',
  },
  disabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Text variants
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#374151',
  },
  outlineText: {
    color: '#E85A8A',
  },
  disabledText: {
    color: '#9ca3af',
  },
});

export default Button;
