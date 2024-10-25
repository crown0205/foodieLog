import { colors } from '@/constants';
import { ReactNode } from 'react';
import { PressableProps, Text, View } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';

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
        <Text style={[styles.titleText, { color: color ?? colors.BLACK }]}>
          {title}
        </Text>
        {subTitle && <Text style={styles.subTitleText}>{subTitle}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: colors.WHITE,
    borderColor: colors.GREY_200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors.GREY_200,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  subTitleText: {
    color: colors.GREY_500,
  },
});

export default SettingItem;
