import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';
import { Spacer } from './Spacer';

type Props = PropsWithChildren<{
  label: string;
}>;

export function Field({ label, children }: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Spacer height={6} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 13,
    marginLeft: 10,
  },
});
