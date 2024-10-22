import { colors } from '@/constants';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

interface PaginationProps {
  pageParam: number;
  fetchPrevPage: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  totalLength: number;
}

function Pagination({
  pageParam,
  hasNextPage,
  totalLength,
  fetchNextPage,
  fetchPrevPage,
}: PaginationProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={fetchPrevPage}
        style={styles.pageButton}
        disabled={pageParam <= 1}
      >
        <Octicons
          name="arrow-left"
          size={15}
          color={pageParam > 1 ? colors.BLACK : colors.GREY_300}
          onPress={fetchPrevPage}
          disabled={pageParam <= 1}
        />
        <Text style={pageParam > 1 ? styles.pageText : styles.disabledPageText}>
          이전페이지
        </Text>
      </Pressable>

      <Pressable
        onPress={fetchNextPage}
        style={styles.pageButton}
        disabled={totalLength === 0 || !hasNextPage}
      >
        <Text
          style={
            totalLength > 0 && hasNextPage
              ? styles.pageText
              : styles.disabledPageText
          }
        >
          다음페이지
        </Text>
        <Octicons
          name="arrow-right"
          size={15}
          color={
            totalLength > 0 && hasNextPage ? colors.BLACK : colors.GREY_300
          }
          onPress={fetchNextPage}
          disabled={totalLength === 0 || !hasNextPage}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
  pageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 30,
  },
  pageText: {
    color: colors.BLACK,
  },
  disabledPageText: {
    color: colors.GREY_300,
  },
});

export default Pagination;
