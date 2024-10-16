import { colors } from '@/constants';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const FeedFavoriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FeedFavoriteScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
