import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewPett from '../pages/NewPett';
import OtherUsers from '../pages/OtherUsers';
import ShowUser from '../pages/ShowUser';


const Stack = createStackNavigator();

function OtherUsersNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"OtherUser"}>
      <Stack.Screen name={"OtherUsers"} component={OtherUsers} />
      <Stack.Screen name={"ShowUser"} component={ShowUser} />
    </Stack.Navigator>
  );
}

export default OtherUsersNavigator;