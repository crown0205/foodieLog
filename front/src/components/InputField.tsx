import React, {forwardRef, useLayoutEffect, useRef} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../constants';
import {mergeRefs} from '../utils/common';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = forwardRef(
  ({touched, error, disabled = false, ...props}: InputFieldProps, ref) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    useLayoutEffect(() => {
      if (touched && Boolean(error))
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }, [touched, error]);

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            props.multiline && styles.multiLine,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef} // ref가 있을 경우 mergeRefs로 합침
            style={[styles.input, disabled && styles.disabled]}
            placeholderTextColor={colors.GREY_500}
            autoCapitalize="none" // 자동 대문자 변환 기능 해제
            editable={!disabled} // 편집 가능 여부
            autoCorrect={false} // 자동완성 기능 해제
            spellCheck={false} // 맞춤법 검사
            {...props}
          />
        </View>
        {touched && Boolean(error) && <Text style={styles.error}>{error}</Text>}
      </Pressable>
    );
  },
);

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GREY_200,
    paddingVertical: deviceHeight > 640 ? 12 : 10,
    paddingHorizontal: deviceHeight > 640 ? 15 : 10,
    borderRadius: 5,
  },
  multiLine: {
    // paddingBottom: deviceHeight > 640 ? 45 : 30,
  },
  input: {
    padding: 0,
    fontSize: 16,
    color: colors.GREY_900,
  },
  disabled: {
    backgroundColor: colors.GREY_100,
    color: colors.GREY_500,
  },
  inputError: {
    borderColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});
