import { colors } from '@/constants';
import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DayOfWeeks from './DayOfWeeks';
import { MonthYear, isSameAsCurrentDate } from '@/utils';
import DateBox from './DateBox';

interface CalendarProps {
  monthYear: MonthYear;
  selectedDate: number;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
}

const Calendar = ({
  monthYear,
  selectedDate,
  onChangeMonth,
  onPressDate,
}: CalendarProps) => {
  const { firstDOW, lastDate, month, year } = monthYear;

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.monthButtonContainer}
          onPress={() => onChangeMonth(-1)}
        >
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
        </Pressable>
        <Pressable
          style={styles.monthButtonContainer}
          onPress={() => onChangeMonth(+1)}
        >
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>

      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({ length: lastDate + firstDOW }, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({ item }) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>
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
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GREY_300,
    backgroundColor: colors.WHITE,
  },
});

export default Calendar;
