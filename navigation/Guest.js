import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Home from '../screens/HomeScreen'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp
  },
});

export default createAppContainer(AppNavigator);

// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Login: Login,
//     Home: Home,
//   })
// );
