import { colorHex, colors } from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';
import { MarkerColor } from '@/types/domain';
import { StyleSheet, View } from 'react-native';
import { Marker, MyMapMarkerProps } from 'react-native-maps';

interface CustomMarkerProps extends MyMapMarkerProps {
  color: MarkerColor;
  score: number;
}

function CustomMarker({
  coordinate,
  color = 'RED',
  score = 5,
  ...props
}: CustomMarkerProps) {
  const { theme } = useThemeStorage();
  const styles = styling(theme);

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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      height: 35,
      width: 32,
    },
    marker: {
      transform: [{ rotate: '45deg' }],
      borderColor: colors[theme].UNCHANGE_BLACK,
      width: 27,
      height: 27,
      borderRadius: 27,
      borderBottomRightRadius: 1,
      borderWidth: 1,
    },
    eye: {
      position: 'absolute',
      backgroundColor: colors[theme].UNCHANGE_BLACK,
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
      borderBottomColor: colors[theme].TRANSPARENT,
      borderTopColor: colors[theme].TRANSPARENT,
      width: 12,
      height: 12,
      borderWidth: 1,
      borderRadius: 12,
    },
    good: {
      transform: [{ rotate: '225deg' }],
      marginLeft: 5,
      marginTop: 5,
      borderRightColor: colors[theme].TRANSPARENT,
      borderLeftColor: colors[theme].UNCHANGE_BLACK,
    },
    soso: {
      marginLeft: 14,
      marginTop: 14,
      width: 8,
      height: 8,
      borderRadius: 0,
      borderLeftColor: colors[theme].UNCHANGE_BLACK,
      borderRightColor: colors[theme].TRANSPARENT,
    },
    bad: {
      marginLeft: 12,
      marginTop: 12,
      borderRightColor: colors[theme].TRANSPARENT,
      borderLeftColor: colors[theme].UNCHANGE_BLACK,
    },
  });

export default CustomMarker;
