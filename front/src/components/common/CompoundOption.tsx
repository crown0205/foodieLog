import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { PropsWithChildren, ReactNode, createContext, useContext } from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface OptionContextValue {
  onClickOutSide: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationType?: ModalProps['animationType'];
}

function OptionMain({
  children,
  isVisible,
  hideOption,
  animationType = 'fade',
  ...props
}: OptionMainProps) {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={hideOption}
      {...props}
    >
      <OptionContext.Provider value={{ onClickOutSide }}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}

function Background({ children }: PropsWithChildren) {
  const optionContext = useContext(OptionContext);
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <SafeAreaView
      style={styles.optionBackground}
      onTouchEnd={optionContext?.onClickOutSide}
    >
      {children}
    </SafeAreaView>
  );
}

function Container({ children }: PropsWithChildren) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={[styles.optionContainer, styles.shadow]}>{children}</View>
  );
}

function Title({ children }: PropsWithChildren) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

function Button({
  children,
  isDanger = false,
  isChecked = false,
  ...props
}: ButtonProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.optionButtonPressed,
        styles.optionButton,
      ]}
      {...props}
    >
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>
        {children}
      </Text>

      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors[theme].BLUE_500} />
      )}
    </Pressable>
  );
}

function Divider() {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.border} />;
}

interface CheckBoxProps extends PressableProps {
  children: ReactNode;
  icon?: ReactNode;
  isChecked: boolean;
}

function CheckBox({
  children,
  icon,
  isChecked = false,
  ...props
}: CheckBoxProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.optionButtonPressed,
        styles.checkBoxContainer,
      ]}
      {...props}
    >
      <Ionicons
        name={`checkmark-circle${isChecked ? '' : '-outline'}`}
        size={22}
        color={colors[theme].BLUE_500}
      />
      {icon}
      <Text style={styles.checkBoxText}>{children}</Text>
    </Pressable>
  );
}

interface FilterProps extends PressableProps {
  children: ReactNode;
  isSelected?: boolean;
}

function Filter({ children, isSelected = false, ...props }: FilterProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={styles.filterContainer} {...props}>
      <Text
        style={[isSelected ? styles.filterSelectedText : styles.filterText]}
      >
        {children}
      </Text>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={22}
        color={isSelected ? colors[theme].BLUE_500 : colors[theme].GREY_500}
      />
    </Pressable>
  );
}

export const CompoundOption = Object.assign(OptionMain, {
  Background,
  Container,
  Title,
  Button,
  Divider,
  CheckBox,
  Filter,
});

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: colors[theme].MODAL_BACKGROUND,
    },
    optionContainer: {
      borderRadius: 15,
      marginHorizontal: 10,
      marginBottom: 10,
      backgroundColor: colors[theme].GREY_100,
      overflow: 'hidden',
    },
    titleContainer: {
      padding: 15,
      alignItems: 'center',
    },
    titleText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors[theme].BLACK,
    },
    optionButton: {
      padding: 15,
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    optionButtonPressed: {
      backgroundColor: colors[theme].GREY_200,
    },
    optionText: {
      fontSize: 17,
      fontWeight: '500',
      color: colors[theme].BLUE_500,
      paddingVertical: 2,
    },
    dangerText: {
      color: colors[theme].RED_500,
    },
    border: {
      height: 1,
      backgroundColor: colors[theme].GREY_300,
    },
    shadow: {
      shadowColor: colors[theme].BLACK,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      elevation: 5,
    },
    checkBoxContainer: {
      padding: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    checkBoxText: {
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    filterContainer: {
      padding: 15,
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    filterText: {
      fontSize: 16,
      color: colors[theme].GREY_300,
    },
    filterSelectedText: {
      fontSize: 16,
      color: colors[theme].BLUE_500,
    },
  });
