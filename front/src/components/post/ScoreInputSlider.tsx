import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import Slider from '@react-native-community/slider';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreInputSliderProps {
  score: number;
  onChangeScore: (score: number) => void;
}

const ScoreInputSlider = ({ score, onChangeScore }: ScoreInputSliderProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점</Text>
        <Text style={styles.labelText}>{score} 점</Text>
      </View>
      <Slider
        value={score}
        onValueChange={onChangeScore}
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={colors[theme].BLUE_400}
        maximumTrackTintColor={colors[theme].GREY_300}
        thumbTintColor={colors[theme].BLUE_500}
      />
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: colors[theme].GREY_200,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    labelText: {
      fontSize: 16,
      color: colors[theme].GREY_700,
    },
  });

export default ScoreInputSlider;
