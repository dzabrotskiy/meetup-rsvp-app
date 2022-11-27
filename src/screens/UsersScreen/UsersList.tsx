import { FlashList } from '@shopify/flash-list';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, useThemeColor, View } from 'components/Themed';
import { Spacer } from 'components/Spacer';

import type { User } from './types';

type Props = {
  users: User[];
  onUserPress(user: User): void;
};

export function UsersList({ users, onUserPress }: Props) {
  const secondaryColor = useThemeColor('secondary');
  const textColor = useThemeColor('text');

  return (
    <FlashList
      data={users}
      estimatedItemSize={50}
      renderItem={({ item }) => (
        <Pressable
          testID="UserItem"
          onPress={() => onUserPress(item)}
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
