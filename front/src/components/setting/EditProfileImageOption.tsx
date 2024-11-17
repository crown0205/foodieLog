import { CompoundOption } from '@/components/common/CompoundOption';
import React from 'react';
import { Text, View } from 'react-native';

interface EditProfileImageOptionProps {
  isVisible: boolean;
  hideOption: () => void;
  onChangeImage: () => void;
}

function EditProfileImageOption({
  isVisible,
  hideOption,
  onChangeImage,
}: EditProfileImageOptionProps) {
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={onChangeImage}>
            앨범애서 사진선택
          </CompoundOption.Button>
        </CompoundOption.Container>

        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default EditProfileImageOption;
