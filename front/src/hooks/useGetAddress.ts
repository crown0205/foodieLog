import { errorMessages } from '@/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';
// TODO : react-native-config를 사용하여 환경 변수를 설정하면, API 키를 환경 변수로 설정하는 것이 좋습니다.

function useGetAddress(location: LatLng) {
  const { latitude, longitude } = location;
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
        );

        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);

  return result;
}

export default useGetAddress;
