import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface SettingItemProps extends PressableProps {
  title: string;
  subTitle?: string;
  onPress: () => void;
  color?: string;
  icon?: ReactNode;
}

function SettingItem({
  title,
  subTitle,
  icon = null,
  color,
  ...props
}: SettingItemProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      {...props}
    >
      {icon}
      <View style={styles.titleContainer}>
        <Text
          style={[styles.titleText, { color: color ?? colors[theme].BLACK }]}
        >
          {title}
        </Text>
        {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
      </View>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      padding: 15,
      backgroundColor: colors[theme].WHITE,
      borderColor: colors[theme].GREY_200,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    pressedContainer: {
      backgroundColor: colors[theme].GREY_200,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleText: {
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    subTitleText: {
      color: colors[theme].GREY_500,
    },
  });

export default SettingItem;
