import { colors } from '@/constants';
import { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from 'react-native';

function Loader({
  children,
  size = 'small',
  color = colors.light.GREY_500,
  ...props
}: PropsWithChildren<ActivityIndicatorProps>) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={color}
        style={styles.indicator}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

export default Loader;
