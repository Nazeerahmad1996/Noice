import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Item, Input, Text } from 'native-base';
import * as firebase from 'firebase';
import Feather from 'react-native-vector-icons/Feather';

export default function Register(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false)

    SignUp = () => {
        setLoading(true)
        if (confirmPassword === password) {
            if (email != '' && username != '' && password != '') {
                firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
                    setLoading(false)
                    var userId = firebase.auth().currentUser.uid
                    props.navigation.navigate("Home")
                    firebase.database().ref('users/' + userId).set({
                        Name: username,
                        Email: email,
                        Uid: userId,
                    });
                    firebase.auth().currentUser.updateProfile({
                        displayName: username,
                    }).then(() => {
                        console.log("This is my Display name: " +firebase.auth().currentUser.displayName)
                    }).catch(function (error) {
                        Alert.alert(error.message);
                    });

                }).catch(function (error) {
                    setLoading(false)
                    Alert.alert(error.message);
                });
            } else {
                setLoading(false)
                Alert.alert("Fill Form Properly!");
            }
        }
        else {
            setLoading(false)
            Alert.alert("Password didn't matched!");
        }
    }

    if (Loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                    <Image
                        source={
                            require('../assets/images/logo.png')
                        }
                        style={styles.logo}
                    />
                </View>
                <View style={{ marginHorizontal: 30, marginTop: '15%' }}>
                    <Item rounded style={{ backgroundColor: '#f7f8fa', marginTop: 5, height: 45 }}>
                        <Feather style={{ marginLeft: 15 }} color='#c7c9cf' size={16} name='user' />
                        <Input onChangeText={text => setUsername(text)} placeholder='Name' />
                    </Item>
                    <Item rounded style={{ backgroundColor: '#f7f8fa', marginTop: 15, height: 45 }}>
                        <Feather style={{ marginLeft: 15 }} color='#c7c9cf' size={16} name='mail' />
                        <Input onChangeText={text => setEmail(text)} placeholder='Email' />
                    </Item>
                    <Item rounded style={{ backgroundColor: '#f7f8fa', marginTop: 15, height: 45 }}>
                        <Feather style={{ marginLeft: 15 }} color='#c7c9cf' size={16} name='lock' />
                        <Input secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder='Password' />
                    </Item>
                    <Item rounded style={{ backgroundColor: '#f7f8fa', marginTop: 15, height: 45 }}>
                        <Feather style={{ marginLeft: 15 }} color='#c7c9cf' size={16} name='lock' />
                        <Input secureTextEntry={true} onChangeText={text => setconfirmPassword(text)} placeholder='Confirm Password' />
                    </Item>
                    <TouchableOpacity onPress={() => this.SignUp()} style={styles.Button}>
                        <Text style={styles.ButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.BottomButtons}>
                    <Text style={styles.AlreadyText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Login")} style={styles.SignUpBtn}>
                        <Text style={styles.LoginText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }
}

Register.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    LoginText: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: '600',

    },
    AlreadyText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0D47A1'
    },
    Button: {
        backgroundColor: '#fbb040',
        textAlign: 'center',
        padding: 10,
        borderRadius: 50,
        marginTop: 15
    },
    ButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    },
    SignupPushText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: '#323643',
        marginTop: '10%'
    },
    TextBox: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#FF0000',
        borderBottomWidth: 4,
    },
    ForgotText: {
        color: '#FF0000',
        fontSize: 16,
        marginTop: 10
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    ButtonRow: {
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: '10%'
    },
    lgbtn: {
        marginLeft: 10,
        height: 42,
        width: 200
    },
    logo: {
        height: 120,
        width: 120,
        borderRadius: 100,
        justifyContent: 'center'
    },
    gl: {
        height: 50,
        width: 50
    },
    SignText: {
        marginLeft: 20,
        fontSize: 22,
        fontWeight: '600',
        marginTop: '20%',

    },
    BottomButtons: {
        alignSelf: "flex-end",
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginTop: 40,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
});
