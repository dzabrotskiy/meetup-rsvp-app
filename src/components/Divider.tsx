import { StyleSheet } from 'react-native';
import { useThemeColor, View } from './Themed';

export function Divider() {
  const secondaryColor = useThemeColor('secondary');

  return <View style={[styles.divider, { backgroundColor: secondaryColor }]} />;
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    marginVertical: 20,
  },
});
