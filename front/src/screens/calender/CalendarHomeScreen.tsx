import Calendar from '@/components/calendar/Calendar';
import { colors } from '@/constants';
import { MonthYear, getMonthYearDetails, getNewMonthYear } from '@/utils';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const CalendarHomeScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState<MonthYear>(currentMonthYear);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar monthYear={monthYear} onChangeMonth={handleUpdateMonth} />
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
