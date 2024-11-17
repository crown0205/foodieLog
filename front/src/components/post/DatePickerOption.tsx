import { colors } from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';
import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerOptionProps {
  isVisible: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
  onConfirmDate: () => void;
}

const DatePickerOption = ({
  date,
  isVisible,
  onChangeDate,
  onConfirmDate,
}: DatePickerOptionProps) => {
  const { theme } = useThemeStorage();
  const styles = styling(theme);

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <SafeAreaView style={[styles.optionBackground, styles.dimmed]}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>
            <DatePicker
              theme={theme}
              mode="date"
              date={date}
              onDateChange={onChangeDate}
              locale="ko"
            />
          </View>
        </View>
        <View style={styles.optionContainer}>
          <Pressable style={styles.optionButton} onPress={onConfirmDate}>
            <Text style={styles.optionText}>확인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    dimmed: {
      backgroundColor: colors[theme].GREY_OPACITY_300,
    },
    optionContainer: {
      borderRadius: 16,
      marginHorizontal: 16,
      marginBottom: 10,
      backgroundColor: colors[theme].WHITE,
      overflow: 'hidden',
    },
    pickerContainer: {
      alignItems: 'center',
      color: colors[theme].BLACK,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      gap: 8,
    },
    optionText: {
      fontSize: 17,
      color: colors[theme].BLUE_500,
      fontWeight: 'bold',
    },
  });

export default DatePickerOption;
