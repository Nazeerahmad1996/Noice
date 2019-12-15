import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';

//configuring firebase with this project

var config = {
  apiKey: "AIzaSyD-KEcD5oEtxhVjMrBM3QnWI9M3pBbbF-4",
  authDomain: "noice-1aed5.firebaseapp.com",
  databaseURL: "https://noice-1aed5.firebaseio.com",
  projectId: "noice-1aed5",
  storageBucket: "noice-1aed5.appspot.com",
  messagingSenderId: "309636724523",
  appId: "1:309636724523:web:2de905846adceba593f76e",
  measurementId: "G-WET44W9X6V"
};
firebase.initializeApp(config);

import AppNavigator from './navigation/AppNavigator';
import Guest from './navigation/Guest';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Logged: false,
      Loader: true,
      isReady: false,
    }
  }

  


  _bootstrapAsync = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    })
  };

  async componentDidMount() {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }


  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}


async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
