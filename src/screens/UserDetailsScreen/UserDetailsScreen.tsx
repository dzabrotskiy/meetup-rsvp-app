import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { RootStackParamList } from 'types';
import { ScreenContainer } from 'components/ScreenContainer';
import { Spacer } from 'components/Spacer';
import { primaryColor } from 'constants/Colors';

import { UserDetailRow } from './UserDetailRow';

export function UserDetailsScreen() {
  const {
    params: { user },
  } = useRoute<RouteProp<RootStackParamList, 'UserDetails'>>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user.name,
    });
  }, []);

  return (
    <ScreenContainer>
      {Platform.OS === 'android' && (
        <Spacer height={80} /> // header height
      )}
      <UserDetailRow
        icon={<MaterialIcons name="person" size={30} color={primaryColor} />}
        label="Name"
        value={user.name}
      />
      <Spacer height={10} />
      <UserDetailRow
        icon={
          <MaterialIcons
            name="perm-contact-calendar"
            size={30}
            color={primaryColor}
          />
        }
        label="Age"
        value={user.age}
      />
      <Spacer height={10} />
      <UserDetailRow
        icon={
          <MaterialIcons name="calendar-today" size={30} color={primaryColor} />
        }
        label="Date of Birth"
        value={new Date(user.dateOfBirth).toLocaleDateString()}
      />
      <Spacer height={10} />
      <UserDetailRow
        icon={<MaterialIcons name="map" size={30} color={primaryColor} />}
        label="Locality"
        value={user.locality}
      />
      <Spacer height={10} />
      <UserDetailRow
        icon={
          <MaterialCommunityIcons
            name="map-marker"
            size={30}
            color={primaryColor}
          />
        }
        label="Address"
        value={user.address}
      />
      <Spacer height={10} />
      <UserDetailRow
        icon={
          <MaterialIcons name="assignment-ind" size={30} color={primaryColor} />
        }
        label="Profession"
        value={user.profession}
      />
      <Spacer height={10} />
      <UserDetailRow
        icon={
          <MaterialIcons
            name="supervisor-account"
            size={30}
            color={primaryColor}
          />
        }
        label="Number Of Guests"
        value={user.numberOfGuests}
      />
    </ScreenContainer>
  );
}
