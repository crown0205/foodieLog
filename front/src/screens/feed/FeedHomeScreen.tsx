import FeedItemList from '@/components/FeedItemList';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const FeedHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeedItemList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
