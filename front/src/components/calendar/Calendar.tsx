import { colors } from '@/constants';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DayOfWeeks from './DayOfWeeks';
import { MonthYear } from '@/utils';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

const Calendar = ({ monthYear, onChangeMonth }: CalendarProps) => {
  const { firstDOW, lastDate, month, year } = monthYear;

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.monthButtonContainer} onPress={() => {}}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
        </Pressable>
        <Pressable style={styles.monthButtonContainer}>
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>

      <DayOfWeeks />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  monthYearContainer: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
});

export default Calendar;
