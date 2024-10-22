import SearchInput from '@/components/common/SearchInput';
import SearchReginResult from '@/components/map/SearchRegionResult';
import useSearchLocation from '@/hooks/useSearchLocation';
import useUserLocation from '@/hooks/useUserLocation';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

const SearchLocationScreen = () => {
  const [keyword, setKeyword] = useState('');
  const { userLocation } = useUserLocation();
  const { regionInfo } = useSearchLocation(keyword, userLocation);

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
