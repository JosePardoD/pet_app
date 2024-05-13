import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewPett from '../pages/NewPett';
import Home from '../pages/Home';


const Stack = createStackNavigator();

function HomeNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Home"}>
      <Stack.Screen name={"Home"} component={Home} />
      <Stack.Screen name={"NewPett"} component={NewPett} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;