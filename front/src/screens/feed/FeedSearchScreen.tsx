import FeedSearchList from '@/components/feed/FeedSearchList';
import { colors } from '@/constants';
import { SafeAreaView, StyleSheet } from 'react-native';

function FeedSearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedSearchList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedSearchScreen;
