import { colors } from '@/constants';
import { RegionInfo } from '@/hooks/useSearchLocation';
import useLocationStore from '@/store/useLocationStore';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LatLng } from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';

interface SearchReginResultProps {
  regionInfo: RegionInfo[];
}

function SearchReginResult({ regionInfo }: SearchReginResultProps) {
  const navigation = useNavigation();
  const { setMoveLocation } = useLocationStore();

  const handlePressRegionInfo = (latitude: string, longitude: string) => {
    const regionLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    moveToMapScreen(regionLocation);
  };

  const moveToMapScreen = (regionLocation: LatLng) => {
    navigation.goBack();
    setMoveLocation(regionLocation);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onTouchStart={() => Keyboard.dismiss()}
        showsVerticalScrollIndicator
        indicatorStyle="black"
        contentContainerStyle={styles.scrollContainer}
      >
        {regionInfo.map((info, index) => (
          <Pressable
            key={info.id}
            onPress={() => handlePressRegionInfo(info.y, info.x)}
            style={[
              styles.itemBorder,
              index === regionInfo.length - 1 && styles.noItemBorder,
            ]}
          >
            <View style={styles.placeNameContainer}>
              <Octicons name="location" size={15} color={colors.BLUE_700} />
              <Text
                style={styles.placeText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {info.place_name}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.distanceText}>{info.distance}</Text>
              <Text style={styles.subInfoText}>{info.category_name}</Text>
            </View>
            <Text style={styles.subInfoText}>{info.road_address_name}</Text>
          </Pressable>
        ))}

        {regionInfo.length === 0 && (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
    marginTop: 10,
  },
  scrollContainer: {
    padding: 10,
  },
  placeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  placeText: {
    color: colors.BLACK,
    flexShrink: 1,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  distanceText: {
    color: colors.GREY_500,
  },
  subInfoText: {
    flexShrink: 1,
    color: colors.GREY_500,
  },
  itemBorder: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: colors.GREY_300,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  noItemBorder: {
    borderBottomWidth: 0,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noResultText: {
    color: colors.GREY_500,
    fontSize: 16,
  },
});

export default SearchReginResult;
