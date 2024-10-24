import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { deviceType } from '@/utils';
import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';

const REDIRECT_URL = `${
  deviceType === 'ios' ? 'http://localhost:3030/' : 'http://10.0.2.2:3030/'
}auth/oauth/kakao`;
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('')";

const KakaoLoginScreen = () => {
  const { kakaoLoginMutation } = useAuth();
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnMessage = (event: WebViewMessageEvent) => {
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

  const handleNavigationStateChange = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URL}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLadingContainer}>
          <ActivityIndicator size="small" color={colors.BLUE_500} />
        </View>
      )}
      <WebView
        style={styles.container}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URL}&lang=ko&response_type=code`,
        }}
        onMessage={handleOnMessage} // NOTE : 웹뷰에서 메시지를 받기 위한 이벤트
        injectedJavaScript={INJECTED_JAVASCRIPT} // NOTE : 웹뷰에서 자바스크립트를 실행하기 위한 속성
        onNavigationStateChange={handleNavigationStateChange} // NOTE : 로딩 상태를 확인하기 위한 이벤트
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
