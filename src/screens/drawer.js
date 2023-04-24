import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import AboutScreen from './App/About';

import WelcomeScreen from './Auth/Welcome';
import {primaryColor} from '~/config/colors';
import CustomDrawerContent from '~/components/Drawer';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Drawer = createDrawerNavigator();

function Menu() {
  const sceneContainerStyle = {
    paddingTop: isIphoneX() ? 20 : 0,
    backgroundColor: 'white',
  };

  return (
    <Drawer.Navigator
      initialRouteName="Screen"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          padding: 20,
          backgroundColor: primaryColor,
        },
        drawerLabelStyle: {
          color: 'white',
          fontSize: 14,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="WELCOME"
        component={WelcomeScreen}
        options={{sceneContainerStyle}}
      />
      <Drawer.Screen
        name="ABOUT US"
        component={AboutScreen}
        options={{sceneContainerStyle}}
      />
    </Drawer.Navigator>
  );
}

export default Menu;
