import Calendar from '@/components/calendar/Calendar';
import EventList from '@/components/calendar/EventList';
import { colors } from '@/constants';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';
import { MonthYear, getMonthYearDetails, getNewMonthYear } from '@/utils';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const CalendarHomeScreen = () => {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState<MonthYear>(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  if (isPending || isError) {
    return <></>;
  }

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
        schedules={posts}
        selectedDate={selectedDate}
        onChangeMonth={handleUpdateMonth}
        onPressDate={handlePressDate}
      />
      <EventList posts={posts[selectedDate]} />
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
