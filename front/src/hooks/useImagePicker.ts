import { ImageUrl } from '@/types/domain';
import { getFormDataImages } from '@/utils';
import { useState } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import useMutateImages from './queries/useMutateImages';

interface UseImagePickerProps {
  initialImages: ImageUrl[];
}

function useImagePicker({ initialImages = [] }: UseImagePickerProps) {
  const [imageUrls, setImageUrls] = useState(initialImages);
  const uploadImages = useMutateImages();

  const addImageUrls = (urls: string[]) => {
    if (imageUrls.length + urls.length > 5) {
      Alert.alert(
        '이미지 갯수 초과',
        '이미지는 최대 5개까지 업로드 가능합니다.',
      );
      return;
    }

    setImageUrls(prev => [...prev, ...urls.map(url => ({ url: url }))]);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages('images', images);

        uploadImages.mutate(formData, {
          onSuccess: data => addImageUrls(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // TODO : 에러 메시지 표시
        }
      });
  };

  return {
    imageUrls,
    handleChange,
    isUploading: uploadImages.isPending,
  };
}

export default useImagePicker;
