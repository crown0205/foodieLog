import { colors } from '@/constants';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ImageInputProps {
  onChange: () => void;
}

const ImageInput = ({ onChange }: ImageInputProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.imageInputPressed,
        styles.imageInput,
      ]}
      onPress={onChange}
    >
      <Ionicons name="camera-outline" size={20} color={colors.GREY_500} />
      <Text style={styles.inputText}>사진 추가</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageInput: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.GREY_300,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: 5,
  },
  imageInputPressed: {
    backgroundColor: colors.GREY_50,
    opacity: 0.8,
  },
  inputText: {
    color: colors.GREY_500,
    fontSize: 14,
  },
});

export default ImageInput;
