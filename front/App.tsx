import { colors } from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StatusBar } from 'react-native';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/root/RootNavigator';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors['light'].BLUE_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors['light'].RED_500 }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

function App(): JSX.Element {
  const { theme } = useThemeStorage();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
