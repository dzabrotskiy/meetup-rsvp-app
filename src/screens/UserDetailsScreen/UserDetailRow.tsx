import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';

import { Spacer } from 'components/Spacer';
import { Text, useThemeColor, View } from 'components/Themed';

type Props = {
  icon?: ReactNode;
  label?: string;
  value?: string | number;
};

export function UserDetailRow({ icon, label, value }: Props) {
  const secondaryColor = useThemeColor('secondary', {
    light: '#fff',
  });

  return (
    <View style={[styles.container, { backgroundColor: secondaryColor }]}>
      <View style={styles.label}>
        {icon}
        <Spacer width={8} />
        <Text>{label}</Text>
      </View>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
