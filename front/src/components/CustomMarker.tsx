import { colors } from '@/constants';
import { MarkerColor } from '@/types/domain';
import { StyleSheet, View } from 'react-native';
import { Marker, MyMapMarkerProps } from 'react-native-maps';

interface CustomMarkerProps extends MyMapMarkerProps {
  color: MarkerColor;
  score: number;
}

const colorHex = {
  RED: colors.RED_400,
  BLUE: colors.BLUE_400,
  YELLOW: colors.YELLOW_400,
  GREEN: colors.GREEN_400,
  PURPLE: colors.PURPLE_400,
};

function CustomMarker({
  coordinate,
  color = 'RED',
  score = 5,
  ...props
}: CustomMarkerProps) {
  const markerView = (
    <View style={styles.container}>
      <View style={[styles.marker, { backgroundColor: colorHex[color] }]}>
        <View style={[styles.eye, styles.leftEye]} />
        <View style={[styles.eye, styles.rightEye]} />
        {score < 3 && <View style={[styles.mouth, styles.bad]} />}
        {score === 3 && <View style={[styles.mouth, styles.soso]} />}
        {score > 3 && <View style={[styles.mouth, styles.good]} />}
      </View>
    </View>
  );

  return coordinate ? (
    <Marker coordinate={coordinate} {...props}>
      {markerView}
    </Marker>
  ) : (
    markerView
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 35,
    width: 32,
  },
  marker: {
    transform: [{ rotate: '45deg' }],
    borderColor: colors.BLACK,
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1,
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    transform: [{ rotate: '45deg' }],
    borderBottomColor: colors.TRANSPARENT,
    borderTopColor: colors.TRANSPARENT,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  good: {
    transform: [{ rotate: '225deg' }],
    marginLeft: 5,
    marginTop: 5,
    borderRightColor: colors.TRANSPARENT,
    borderLeftColor: colors.BLACK,
  },
  soso: {
    marginLeft: 14,
    marginTop: 14,
    width: 8,
    height: 8,
    borderRadius: 0,
    borderLeftColor: colors.BLACK,
    borderRightColor: colors.TRANSPARENT,
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: colors.TRANSPARENT,
    borderLeftColor: colors.BLACK,
  },
});

export default CustomMarker;
