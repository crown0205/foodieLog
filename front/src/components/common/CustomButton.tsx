import React, { ReactNode } from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors } from '../../constants';
import { View } from 'react-native';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large' | 'full';
  inValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  style = null,
  textStyle = null,
  icon = null,
  ...props
}: CustomButtonProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      disabled={inValid}
      style={({ pressed }) => [
        styles.container,
        styles[size],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
        style,
      ]}
      {...props}
    >
      <View style={styles.innerContainer}>
        {icon}
        <Text style={[styles[`${variant}Text`], styles.text, textStyle]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    filled: {
      backgroundColor: colors[theme].BLUE_500,
    },
    outlined: {
      borderColor: colors[theme].BLUE_500,
      borderWidth: 1,
    },
    filledPressed: {
      backgroundColor: colors[theme].BLUE_300,
    },
    outlinedPressed: {
      borderColor: colors[theme].BLUE_300,
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
    full: {
      width: '100%',
      height: '100%',
      paddingVertical: deviceHeight > 700 ? 15 : 12,
      paddingHorizontal: 20,
    },
    filledText: {
      color: 'white',
    },
    outlinedText: {
      color: colors[theme].BLUE_500,
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
