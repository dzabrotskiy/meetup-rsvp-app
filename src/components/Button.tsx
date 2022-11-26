import { StyleSheet, TouchableOpacity } from 'react-native';

import { primaryColor } from 'constants/Colors';

import { Text } from './Themed';

type Props = {
  title?: string;
  onPress?(): void;
  type?: 'primary' | 'secondary' | 'tertiary';
};

export function Button({ title, onPress, type = 'primary' }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, type === 'secondary' && styles.secondary]}
      activeOpacity={0.9}
    >
      <Text style={[styles.title, type === 'primary' && styles.titlePrimary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
    borderRadius: 11,
  },
  title: {
    fontSize: 17,
  },
  titlePrimary: {
    color: '#fff',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: primaryColor,
  },
});
