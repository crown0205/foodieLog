import { colors, numbers } from '@/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  onChangeYear: (selectYear: number) => void;
  onHide: () => void;
}

function YearSelector({
  isVisible,
  currentYear,
  onChangeYear,
  onHide,
}: YearSelectorProps) {
  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <View style={styles.yearsContainer}>
            <FlatList
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR}
              data={Array.from(
                {
                  length:
                    numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
                },
                (_, index) => ({
                  id: index,
                  num: index + numbers.MIN_CALENDAR_YEAR,
                }),
              )}
              renderItem={({ item }) => (
                <Pressable
                  key={item.num}
                  onPress={() => onChangeYear(item.num)}
                  style={[
                    styles.yearButton,
                    currentYear === item.num && styles.selectedYearButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.yearText,
                      currentYear === item.num && styles.currenYearText,
                    ]}
                  >
                    {item.num}
                  </Text>
                </Pressable>
              )}
              keyExtractor={item => String(item.num)}
              numColumns={numbers.CALENDAR_YEAR_SELECTOR_COLUMN}
            />
          </View>
          <Pressable>
            <Text>닫기</Text>
            <MaterialIcons
              name="keyboard-arrow-up"
              size={25}
              color={colors.BLACK}
            />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: colors.GREY_300,
  },
  yearsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  yearButton: {
    width: '25%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedYearButton: {
    backgroundColor: colors.GREY_100,
  },
  yearText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  currenYearText: {
    fontWeight: 'bold',
  },
});

export default YearSelector;
