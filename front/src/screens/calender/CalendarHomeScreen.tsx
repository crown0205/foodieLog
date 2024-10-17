import Calendar from '@/components/calendar/Calendar';
import { colors } from '@/constants';
import { MonthYear, getMonthYearDetails, getNewMonthYear } from '@/utils';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const CalendarHomeScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState<MonthYear>(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        selectedDate={selectedDate}
        onChangeMonth={handleUpdateMonth}
        onPressDate={handlePressDate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
