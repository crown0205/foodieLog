import {ForwardedRef} from 'react';

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

export {mergeRefs};
