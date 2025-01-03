import { colors, numbers } from '@/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

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
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const yearIndex = currentYear - numbers.MIN_CALENDAR_YEAR;
    const currentRow = Math.floor(
      yearIndex / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
    );
    const scrollToY = currentRow * 50;

    setScrollY(scrollToY);
  }, [isVisible, currentYear]);

  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <View style={styles.yearsContainer}>
            <FlatList
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              contentOffset={{ x: 0, y: scrollY }}
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
                    currentYear === item.num && styles.currentYearButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.yearText,
                      currentYear === item.num && styles.currentYearText,
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

          <Pressable style={styles.closeButton} onPress={onHide}>
            <Text style={styles.closeText}>닫기</Text>
            <MaterialIcons
              name="keyboard-arrow-up"
              size={25}
              color={colors[theme].BLACK}
            />
          </Pressable>
        </View>
      )}
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
    },
    yearsContainer: {
      alignItems: 'center',
      backgroundColor: colors[theme].WHITE,
    },
    scrollContainer: {
      maxHeight: 300,
      backgroundColor: colors[theme].WHITE,
    },
    yearButton: {
      width: 80,
      height: 40,
      padding: 10,
      margin: 5,
      borderWidth: 1,
      borderColor: colors[theme].GREY_500,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentYearButton: {
      backgroundColor: colors[theme].BLUE_700,
      borderColor: colors[theme].BLUE_700,
    },
    yearText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].GREY_700,
    },
    currentYearText: {
      color: colors[theme].WHITE,
      fontWeight: '600',
    },
    closeButton: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors[theme].WHITE,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors[theme].GREY_500,
    },
    closeText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default YearSelector;
