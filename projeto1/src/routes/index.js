import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../pages/login';
import MainScreen from '../pages/main';

const routeNavigation = createStackNavigator(
  {
    Login: LoginScreen,
    Main: MainScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

const Routes = createAppContainer(routeNavigation);

export default Routes;  
