import { colors } from '@/constants';
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
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <SafeAreaView style={[styles.optionBackground, styles.dimmed]}>
        <View style={styles.optionContainer}>
          <View style={styles.pickerContainer}>
            <DatePicker
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

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dimmed: {
    backgroundColor: colors.GREY_OPACITY_300,
  },
  optionContainer: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: colors.WHITE,
    overflow: 'hidden',
  },
  pickerContainer: {
    alignItems: 'center',
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
    color: colors.BLUE_500,
    fontWeight: 'bold',
  },
});

export default DatePickerOption;
