import { colorHex, colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStorage from '@/hooks/useThemeStorage';
import { Category, MarkerColor, ThemeMode } from '@/types';
import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

function MapLegend() {
  const { theme } = useThemeStorage();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const { getProfileQuery } = useAuth();
  const { categories } = getProfileQuery.data || {};

  return (
    <>
      {Object.values(categories as Category).join('') !== '' && (
        <View style={[styles.container, { top: insets.top || 20 }]}>
          {categoryList.map((color, idx) => {
            return (
              <Fragment key={idx}>
                {categories?.[color] !== '' && (
                  <View style={styles.colum}>
                    <View
                      style={[
                        styles.legendColor,
                        { backgroundColor: colorHex[color] },
                      ]}
                    />
                    <Text style={styles.legendText}>{categories?.[color]}</Text>
                  </View>
                )}
              </Fragment>
            );
          })}
        </View>
      )}
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 15,
      backgroundColor: colors[theme].MODAL_BACKGROUND,
      padding: 10,
      borderRadius: 10,
      gap: 5,
    },
    colum: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    legendColor: {
      width: 10,
      height: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    legendText: {
      color: colors[theme].UNCHANGE_WHITE,
      fontSize: 12,
      fontWeight: '500',
    },
  });

export default MapLegend;
