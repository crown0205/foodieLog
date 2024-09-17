import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('앱으로 돌아왔다!');
          setIsComeback(true);
        }

        if (appState.current.match(/active/) && nextAppState === 'background') {
          console.log('앱을 나갔다!');
          setIsComeback(false);
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      },
    );

    return () => {
      // NOTE : 이벤트 리스너 제거를 해주는 이유는 메모리 누수를 방지하기 위함과 불필요한 이벤트 리스너가 동작하지 않도록 하기 위함
      subscription.remove();
    };
  }, []);

  return { isComeback, appStateVisible };
}

export default useAppState;
