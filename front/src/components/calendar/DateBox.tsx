import { colors } from '@/constants';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

interface DateBoxProps {
  date: number;
  isToday: boolean;
  selectedDate: number;
  onPressDate: (date: number) => void;
}

const deviceWidth = Dimensions.get('window').width;

function DateBox({ date, isToday, selectedDate, onPressDate }: DateBoxProps) {
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
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: colors.WHITE,
  },
  dateText: {
    fontSize: 17,
    color: colors.BLACK,
  },
  selectedContainer: {
    backgroundColor: colors.BLUE_500,
  },
  selectedDateText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  selectedTodayContainer: {
    backgroundColor: colors.BLUE_500,
  },
  selectedTodayText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  todayContainer: {
    backgroundColor: colors.BLUE_100,
  },
  todayText: {
    color: colors.BLUE_500,
    fontWeight: 'bold',
  },
});

export default DateBox;
