import { ForwardedRef } from 'react';
import { Platform } from 'react-native';

// NOTE : ref를 합치는 함수
function mergeRefs<T>(...ref: ForwardedRef<T>[]) {
  return (value: T) => {
    ref.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  };
}

const deviceType = Platform.OS;

export { deviceType, mergeRefs };
