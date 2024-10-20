import { colors } from '@/constants';
import { MonthYear, isSameAsCurrentDate } from '@/utils';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateBox from './DateBox';
import DayOfWeeks from './DayOfWeeks';
import useModal from '@/hooks/useModal';
import YearSelector from './YearSelector';

interface CalendarProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: Record<number, T[]>;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
}

const Calendar = <T,>({
  monthYear,
  selectedDate,
  schedules,
  onChangeMonth,
  onPressDate,
}: CalendarProps<T>) => {
  const { firstDOW, lastDate, month, year } = monthYear;
  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.monthButtonContainer}
          onPress={() => onChangeMonth(-1)}
        >
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}
        >
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
              selectedDate={selectedDate}
              hasSchedule={Boolean(schedules[item.date])}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>

      <YearSelector
        isVisible={yearSelector.isVisible}
        currentYear={year}
        onChangeYear={handleChangeYear}
        onHide={yearSelector.hide}
      />
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
