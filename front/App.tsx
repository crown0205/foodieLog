import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';

import { QueryClientProvider } from '@tanstack/react-query';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/root/RootNavigator';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
