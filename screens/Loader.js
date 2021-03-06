import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';
import * as firebase from 'firebase';
const { width, height } = Dimensions.get('window');

export default class AppPreLoader extends Component {

    //Intial Route Page

    _bootstrapAsync = async () => {
        //Check if user is logged in or not
        //if logged in then Logged in Navigator run else signIn 
        await firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        })
    };

    async componentDidMount() {
        this._bootstrapAsync();
    }
    //Loader
    render() {
        return (
            <View style={[styles.preloader]}>
                <ActivityIndicator style={{ height: 80 }} size="large" color="#fbb040" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    preloader: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: '#FFFFFF',
    }
})
