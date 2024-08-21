import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  Dimensions,
} from 'react-native';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        styles[size],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}>
      <Text style={[styles[`${variant}Text`], styles.text]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: colors.BLUE_500,
  },
  outlined: {
    borderColor: colors.BLUE_500,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.BLUE_300,
  },
  outlinedPressed: {
    borderColor: colors.BLUE_300,
    borderWidth: 1,
  },
  small: {
    width: 'auto',
    paddingVertical: deviceHeight > 700 ? 5 : 4,
    paddingHorizontal: 10,
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 10 : 8,
    paddingHorizontal: 15,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 12,
    paddingHorizontal: 20,
  },
  filledText: {
    color: 'white',
  },
  outlinedText: {
    color: colors.BLUE_500,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  inValid: {
    opacity: 0.5,
  },
});

export default CustomButton;
