// In App.js in a new project

import  React from 'react';
import { Colors } from './../components/styles';
const {primary,tertiary}=Colors;


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Routes
import Login from './../pages/Login';
import Signup from './../pages/Signup';
import Welcome from './../pages/Welcome';
import { ScreenStackHeaderLeftView } from 'react-native-screens';



const Stack = createNativeStackNavigator();

const RootStack=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor:'transparent'
            },
            headerTintColor: tertiary,
            headerTransparent: true,
            headerTitle:'',
            headerLeftContainerStyle:{
                paddingLeft:20
            }
        }}
        initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />        
          <Stack.Screen name="Welcome" component={Welcome} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;