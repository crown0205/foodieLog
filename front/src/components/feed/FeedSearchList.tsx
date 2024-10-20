import { colors } from '@/constants';
import useGetInfiniteSearchPosts from '@/hooks/queries/useGetInfiniteSearchPosts';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchInput from '../common/SearchInput';
import FeedItem from './FeedItem';

// TODO : search api 수정 필요
function FeedSearchList() {
  const navigation = useNavigation<DrawerNavigationProp<MainDrawerParamList>>();
  const [keyword, setKeyword] = useState<string>('');
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteSearchPosts(keyword);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleChangeKeyword = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)} // NOTE: keyExtractor는 각 아이템의 고유한 키를 반환하는 함수입니다.
      numColumns={2} // NOTE: 2개의 열로 표시
      scrollIndicatorInsets={{ right: 1 }} // NOTE: 스크롤바 위치 조정
      contentContainerStyle={styles.contentContainer} // NOTE: 스크롤뷰 컨텐츠의 스타일을 지정
      indicatorStyle={'black'} // NOTE: 스크롤바 색상
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.drawerIconContainer}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name={'menu'} color={colors.BLACK} size={25} />
          </Pressable>
          <View style={styles.inputContainer}>
            <SearchInput
              autoFocus
              placeholder="주소 또는 제목으로 검색"
              value={keyword}
              onChangeText={handleChangeKeyword}
              onSubmit={() => Keyboard.dismiss()}
            />
          </View>
        </View>
      }
      stickyHeaderIndices={[0]}
      onEndReached={handleEndReached} // NOTE: 스크롤이 끝에 도달했을 때 호출되는 함수
      onEndReachedThreshold={0.5} // NOTE : 이 기능은 스크롤이 끝에 도달했을 때 호출되는 함수를 지정하는 기능입니다. 0.5는 스크롤이 끝에 도달하기 전에 50% 남았을 때 호출됩니다.
      onScrollBeginDrag={() => Keyboard.dismiss()} // NOTE: 키보드 숨김
      refreshing={isRefreshing} // NOTE: 새로고침 중인지 여부
      onRefresh={handleRefresh} // NOTE: 새로고침 함수
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: colors.GREY_300,
    alignItems: 'center',
    gap: 10,
  },
  drawerIconContainer: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.GREY_300,
    padding: 6,
    borderRadius: 5,
  },
  inputContainer: {
    flex: 1,
  },
});

export default FeedSearchList;
