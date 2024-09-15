import { alerts } from '@/constants';
import { deviceType } from '@/utils';
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermission: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermission: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = deviceType === 'android';
      const permissionOS = isAndroid ? androidPermission : iosPermission;
      const checked = await check(permissionOS[type]);

      console.log({ checked });

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정으로 이동',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              onPress: () => {},
              style: 'cancel',
            },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
          }

          await request(permissionOS[type]); // NOTE : android는 request를 해도 바로 결과가 나오지 않아서 다시 check를 해야함
          break;
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
}

export default usePermission;
