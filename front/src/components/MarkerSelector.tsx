import { colors } from '@/constants';
import { MarkerColor } from '@/types/domain';
import React from 'react';
import {
  Pressable,
  PressableProps,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomMarker from './CustomMarker';

interface MarkerSelectorProps extends PressableProps {
  markerColor: MarkerColor;
  onPressMarker: (color: MarkerColor) => void;
  score?: number;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

const MarkerSelector = ({
  markerColor,
  score = 5,
  onPressMarker,
}: MarkerSelectorProps) => {
  return (
    <View style={styles.markerInputContainer}>
      <Text style={styles.markerLabel}>마커 선택</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.markerInputScroll}>
          {categoryList.map(color => (
            <Pressable
              key={color}
              style={[
                styles.markerBox,
                markerColor === color && styles.pressedMarker,
              ]}
              onPress={() => onPressMarker(color)}
            >
              <CustomMarker color={color} score={score} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  markerInputContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.GREY_300,
    borderRadius: 6,
  },
  markerLabel: {
    marginBottom: 15,
    color: colors.GREY_700,
    fontSize: 14,
  },
  markerInputScroll: {
    flexDirection: 'row',
    gap: 20,
  },
  markerBox: {
    width: 50,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GREY_OPACITY_100,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: colors.BLUE_200,
  },
});

export default MarkerSelector;
