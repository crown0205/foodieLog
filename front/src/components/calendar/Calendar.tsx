import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';
import { MonthYear, isSameAsCurrentDate } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalderaHomeHeaderRight from './CalendarHomeHeaderRight';
import DateBox from './DateBox';
import DayOfWeeks from './DayOfWeeks';
import YearSelector from './YearSelector';

interface CalendarProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: Record<number, T[]>;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
  moveToToday: () => void;
}

const Calendar = <T,>({
  monthYear,
  selectedDate,
  schedules,
  onChangeMonth,
  onPressDate,
  moveToToday,
}: CalendarProps<T>) => {
  const { theme } = useThemeStorage();
  const styles = styling(theme);
  const { firstDOW, lastDate, month, year } = monthYear;
  const navigation = useNavigation();
  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => CalderaHomeHeaderRight(moveToToday),
    });
  }, [moveToToday, navigation]);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.monthButtonContainer}
          onPress={() => onChangeMonth(-1)}
        >
          <Ionicons name="arrow-back" size={25} color={colors[theme].BLACK} />
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
          <Ionicons
            name="arrow-forward"
            size={25}
            color={colors[theme].BLACK}
          />
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
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
      color: colors[theme].BLACK,
    },
    bodyContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors[theme].GREY_300,
      backgroundColor: colors[theme].WHITE,
    },
  });

export default Calendar;
