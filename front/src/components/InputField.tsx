import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Pressable,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../constants';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const InputField = ({
  touched,
  error,
  disabled = false,
  ...props
}: InputFieldProps) => {
  const innerRef = React.useRef<TextInput | null>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePressInput}>
      <View
        style={[
          styles.container,
          props.multiline && styles.multiLine,
          disabled && styles.disabled,
          touched && Boolean(error) && styles.inputError,
        ]}>
        <View style={styles.innerContainer}>
          <TextInput
            ref={innerRef}
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
      </View>
    </Pressable>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.GREY_200,
    paddingVertical: deviceHeight > 640 ? 15 : 10,
    paddingHorizontal: deviceHeight > 640 ? 15 : 10,
    borderRadius: 5,
  },
  multiLine: {},
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
