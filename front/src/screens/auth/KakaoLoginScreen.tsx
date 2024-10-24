import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import axios from 'axios';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const REDIRECT_URL = `http://localhost:3030/auth/oauth/kakao`;
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('')";

const KakaoLoginScreen = () => {
  const { kakaoLoginMutation } = useAuth();

  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log('EVENT', event.nativeEvent.url);
    if (event.nativeEvent.url.includes(`${REDIRECT_URL}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URL}?code=`, '');
      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URL,
        code,
      },
    });

    kakaoLoginMutation.mutate(response.data.access_token);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URL}&lang=ko&response_type=code`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaoLadingContainer: {
    backgroundColor: colors.WHITE,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KakaoLoginScreen;
