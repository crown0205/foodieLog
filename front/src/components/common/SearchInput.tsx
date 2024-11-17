import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

function SearchInput({ onSubmit, ...props }: SearchInputProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors[theme].GREY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        clearButtonMode="while-editing"
        {...props}
      />
      <Ionicons
        name="search"
        color={colors[theme].GREY_700}
        size={20}
        onPress={onSubmit}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: colors[theme].GREY_200,
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      padding: 0,
      color: colors[theme].BLACK,
    },
  });
export default SearchInput;
