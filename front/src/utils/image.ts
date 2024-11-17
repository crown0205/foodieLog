import type { Image } from 'react-native-image-crop-picker';

// NOTE : 이미지 파일을 FormData 형식으로 변환하는 함수
function getFormDataImages(key: string = 'images', images: Image[]) {
  const formData = new FormData();

  images.forEach(({ path, mime }) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    };

    formData.append(key, file);
  });

  return formData;
}

export { getFormDataImages };
