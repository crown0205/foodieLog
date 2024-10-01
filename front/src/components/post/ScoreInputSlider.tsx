import { colors } from '@/constants';
import Slider from '@react-native-community/slider';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreInputSliderProps {
  score: number;
  onChangeScore: (score: number) => void;
}

const ScoreInputSlider = ({ score, onChangeScore }: ScoreInputSliderProps) => {
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
        minimumTrackTintColor={colors.BLUE_400}
        maximumTrackTintColor={colors.GREY_300}
        thumbTintColor={colors.BLUE_500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.GREY_200,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    color: colors.GREY_700,
  },
});

export default ScoreInputSlider;
