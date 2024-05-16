import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Map from '../pages/Map';
import OtherUser from '../pages/OtherUsers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-vector-icons/Ionicons';

import HomeNavigator from './HomeNavigator';
import OtherUsersNavigator from './OtherUsersNavigator';

import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator

      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === "Home tab") {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === "Map") {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === "OtherUser" ) {
            iconName = focused ? 'people-circle-sharp' : 'people-circle-outline';
          }   
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen name="Home tab" component={HomeNavigator} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="OtherUsers" component={OtherUsersNavigator} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;