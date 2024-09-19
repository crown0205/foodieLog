import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type AddPostScreenProps = StackScreenProps<MapStackParamList, 'AddPost'>;

const AddPostScreen = ({ route }: AddPostScreenProps) => {
  const { location } = route.params;
  return (
    <View>
      <Text>AddPostScreen</Text>

      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddPostScreen;
