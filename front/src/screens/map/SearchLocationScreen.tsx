import Pagination from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';
import SearchReginResult from '@/components/map/SearchRegionResult';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState('');
  const { userLocation } = useUserLocation();
  const { regionInfo, pageParam, hasNextPage, fetchNextPage, fetchPrevPage } =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        placeholder="검색할 장소를 입력해주세요."
        onSubmit={() => {
          Keyboard.dismiss();
        }}
      />

      <SearchReginResult regionInfo={regionInfo} />
      <Pagination
        pageParam={pageParam}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
        totalLength={regionInfo.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;
