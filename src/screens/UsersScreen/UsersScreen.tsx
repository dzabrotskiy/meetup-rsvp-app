import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import users from 'mock/users.json';
import { ScreenContainer } from 'components/ScreenContainer';
import { Spacer } from 'components/Spacer';
import { TextField } from 'components/TextField';
import { Divider } from 'components/Divider';

import { findUsersByNameAndLocality } from './findUsersByNameAndLocality';
import { UsersList } from './UsersList';

export function UsersScreen() {
  const { bottom: marginBottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const [data, setData] = useState(users);
  const [filter, setFilter] = useState('');

  const [debouncedFilter] = useDebounce(filter, 500);

  useEffect(() => {
    if (!debouncedFilter) {
      setData(users);
    }
    setData(findUsersByNameAndLocality(users, debouncedFilter));
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
      <UsersList
        users={data}
        onUserPress={(user) => {
          navigation.navigate('UserDetails', { user });
        }}
      />
      <Spacer height={marginBottom + 20} />
    </ScreenContainer>
  );
}
