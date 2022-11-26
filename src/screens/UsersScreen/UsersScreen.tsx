import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useDebounce } from 'use-debounce';

import { Text, useThemeColor, View } from 'components/Themed';
import users from 'mock/users.json';
import { ScreenContainer } from 'components/ScreenContainer';
import { Spacer } from 'components/Spacer';
import { TextField } from 'components/TextField';
import { Divider } from 'components/Divider';

export function UsersScreen() {
  const secondaryColor = useThemeColor('secondary');
  const textColor = useThemeColor('text');
  const { bottom: marginBottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const [data, setData] = useState(users);
  const [filter, setFilter] = useState('');

  const [debouncedFilter] = useDebounce(filter, 500);

  useEffect(() => {
    if (!debouncedFilter) {
      setData(users);
    }
    setData(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(debouncedFilter) ||
          user.locality.toLowerCase().includes(debouncedFilter)
      )
    );
  }, [debouncedFilter]);

  return (
    <ScreenContainer>
      <TextField
        label="Search"
        placeholder="Search user by name or locality"
        value={filter}
        onChange={(text) => setFilter(text)}
      />
      <Divider />
      <FlashList
        data={data}
        estimatedItemSize={50}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('UserDetails', { user: item })}
            style={[styles.item, { backgroundColor: secondaryColor }]}
          >
            <View style={styles.userDetails}>
              <Text style={styles.name}>{item.name}</Text>
              <Spacer height={4} />
              <Text>{item.locality}</Text>
            </View>
            <MaterialIcons size={30} name="chevron-right" color={textColor} />
          </Pressable>
        )}
      />
      <Spacer height={marginBottom + 20} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  userDetails: {
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 18,
  },
});
