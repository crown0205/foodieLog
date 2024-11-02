import { colors } from '@/constants';
import { RegionInfo } from '@/hooks/useSearchLocation';
import useLocationStore from '@/store/useLocationStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
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
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation();
  const { setMoveLocation, setSelectLocation } = useLocationStore();

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
    setSelectLocation(regionLocation);
  };

  return (
    <View style={styles.container}>
      <ScrollView
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
              <Octicons
                name="location"
                size={15}
                color={colors[theme].BLUE_700}
              />
              <Text
                style={styles.placeText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {info.place_name}
              </Text>
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.distanceText}>
                {(Number(info.distance) / 1000).toFixed(1)}Km
              </Text>
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

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
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
      color: colors[theme].BLACK,
      flexShrink: 1,
      fontSize: 16,
    },
    categoryContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    distanceText: {
      color: colors[theme].GREY_500,
    },
    subInfoText: {
      flexShrink: 1,
      color: colors[theme].GREY_500,
    },
    itemBorder: {
      marginHorizontal: 10,
      paddingVertical: 10,
      borderBottomColor: colors[theme].GREY_300,
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
      color: colors[theme].GREY_500,
      fontSize: 16,
    },
  });

export default SearchReginResult;
