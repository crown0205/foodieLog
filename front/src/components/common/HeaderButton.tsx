import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
} from 'react-native';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  icon?: ReactNode;
  hasError?: boolean;
}

const HeaderButton = ({
  labelText,
  icon,
  hasError = false,
  ...props
}: HeaderButtonProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable disabled={hasError} style={styles.container} {...props}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors[theme].BLUE_500,
    },
    textError: {
      color: colors[theme].GREY_400,
    },
  });

export default HeaderButton;
