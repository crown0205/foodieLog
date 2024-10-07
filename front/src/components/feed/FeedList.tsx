import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts';
import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FeedItem from './FeedItem';

function FeedList() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

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

  return (
    <FlatList
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={item => String(item.id)}
      numColumns={2}
      scrollIndicatorInsets={{ right: 1 }}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.column}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      indicatorStyle="black"
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  column: {
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    gap: 10,
  },
});

export default FeedList;
