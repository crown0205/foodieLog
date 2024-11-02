import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

interface DateBoxProps {
  date: number;
  isToday: boolean;
  hasSchedule: boolean;
  selectedDate: number;
  onPressDate: (date: number) => void;
}

const deviceWidth = Dimensions.get('window').width;

function DateBox({
  date,
  isToday,
  hasSchedule,
  selectedDate,
  onPressDate,
}: DateBoxProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <>
          <View
            style={[
              styles.dateContainer,
              isToday && styles.todayContainer,
              selectedDate === date && styles.selectedContainer,
              selectedDate === date && isToday && styles.selectedTodayContainer,
            ]}
          >
            <Text
              style={[
                styles.dateText,
                isToday && styles.todayText,
                selectedDate === date && styles.selectedDateText,
                selectedDate === date && isToday && styles.selectedTodayText,
              ]}
            >
              {date}
            </Text>
          </View>
          {hasSchedule && <View style={styles.scheduleIndicator} />}
        </>
      )}
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: deviceWidth / 7,
      height: deviceWidth / 7,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].WHITE,
    },
    dateContainer: {
      marginTop: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 28,
      backgroundColor: colors[theme].WHITE,
    },
    dateText: {
      fontSize: 17,
      color: colors[theme].BLACK,
    },
    selectedContainer: {
      backgroundColor: colors[theme].BLUE_500,
    },
    selectedDateText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    selectedTodayContainer: {
      backgroundColor: colors[theme].BLUE_500,
    },
    selectedTodayText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
    todayContainer: {
      backgroundColor: colors[theme].BLUE_100,
    },
    todayText: {
      color: colors[theme].BLUE_500,
      fontWeight: 'bold',
    },
    scheduleIndicator: {
      position: 'absolute',
      bottom: 5,
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: colors[theme].BLUE_500, // TODO : change color
    },
  });

export default DateBox;
