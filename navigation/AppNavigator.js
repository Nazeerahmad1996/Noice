import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import Home from '../screens/HomeScreen'
import LogoutScreen from '../screens/LogoutScreen'
import PostDetailsScreen from '../screens/DetailScreen'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Loader from '../screens/Loader'

//After Login Navigator
const AppStack = createStackNavigator({
  Home: {
    screen: Home,
  },
  LogoutScreen: {
    screen: LogoutScreen,
  },
  PostDetailsScreen: {
    screen: PostDetailsScreen
  }
});

//Before Login Navigator
const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp
  },
});


export default createAppContainer(
  createSwitchNavigator(
    {
      Load: Loader,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Load',
    }
  )
);
