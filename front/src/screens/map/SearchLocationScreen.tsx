import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchLocationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SearchLocationScreen</Text>
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
