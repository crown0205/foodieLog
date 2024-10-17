import { colors } from '@/constants';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

function SearchInput({ onSubmit, ...props }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor={colors.GREY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        clearButtonMode="while-editing"
        {...props}
      />
      <Ionicons
        name="search"
        color={colors.GREY_700}
        size={20}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.GREY_200,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    color: colors.BLACK,
  },
});
export default SearchInput;
