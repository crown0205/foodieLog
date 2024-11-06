import { storageKeys } from '@/constants';
import { Marker } from '@/types';
import { getEncryptStorage, setEncryptStorage } from '@/utils';
import { useEffect, useState } from 'react';

const initialFilters = {
  RED: true,
  YELLOW: true,
  GREEN: true,
  BLUE: true,
  PURPLE: true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
};

function useMarkerFilterStorage() {
  // FIX: marker 정보 store로 변경

  const [filterItems, setFilterItems] =
    useState<Record<string, boolean>>(initialFilters);

  const set = async (item: Record<string, boolean>) => {
    await setEncryptStorage(storageKeys.MARKER_FILTER, item);
    setFilterItems(item);
  };

  const transformFilteredMarker = (markers: Marker[]) => {
    return markers.filter(marker => {
      return (
        filterItems[marker.color] === true &&
        filterItems[String(marker.score)] === true
      );
    });
  };

  useEffect(() => {
    (async () => {
      const storeData =
        (await getEncryptStorage(storageKeys.MARKER_FILTER)) ?? initialFilters;
      setFilterItems(storeData);
    })();
  }, []);

  return { set, items: filterItems, transformFilteredMarker };
}

export default useMarkerFilterStorage;
