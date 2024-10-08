import { colors } from '@/constants';
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
  return (
    <View style={[styles.optionContainer, styles.shadow]}>{children}</View>
  );
}

function Title({ children }: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
}

function Button({ children, isDanger = false, ...props }: ButtonProps) {
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
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.border} />;
}

export const CompoundOption = Object.assign(OptionMain, {
  Background,
  Container,
  Title,
  Button,
  Divider,
});

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.MODAL_BACKGROUND,
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GREY_100,
    overflow: 'hidden',
  },
  titleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.BLACK,
  },
  optionButton: {
    padding: 15,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  optionButtonPressed: {
    backgroundColor: colors.GREY_200,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.BLUE_500,
    paddingVertical: 2,
  },
  dangerText: {
    color: colors.RED_500,
  },
  border: {
    height: 1,
    backgroundColor: colors.GREY_300,
  },
  shadow: {
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    elevation: 5,
  },
});
