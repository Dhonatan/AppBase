import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationService from '~/tools/NavigationService';

import Drawer from './drawer';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator
        initialRouteName="Drawer"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
