import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NotFoundScreen from 'screens/NotFoundScreen';
import { RegistrationScreen } from 'screens/RegistrationScreen';
import { UsersScreen } from 'screens/UsersScreen';
import { primaryColor } from 'constants/Colors';
import { UserDetailsScreen } from 'screens/UserDetailsScreen';
import { ReportsScreen } from 'screens/ReportsScreen';
import { RootStackParamList } from 'types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: primaryColor,
        drawerActiveBackgroundColor: primaryColor,
        drawerActiveTintColor: '#000',
      }}
    >
      <Drawer.Screen name="Registration" component={RegistrationScreen} />
      <Drawer.Screen name="Users" component={UsersScreen} />
      <Drawer.Screen name="Reports" component={ReportsScreen} />
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

export function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
