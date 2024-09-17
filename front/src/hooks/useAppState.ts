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
      },
    );

    return () => {
      subscription.remove(); // NOTE : 이벤트 리스너 제거
    };
  }, []);

  return { appStateVisible, isComeback };
}

export default useAppState;
