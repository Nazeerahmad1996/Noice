import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Card, CardItem, Body, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as firebase from 'firebase';

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false)

    SignIn = async () => {
        setLoading(true)
        if (email != '' && password != '') {
            firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
                setLoading(false)
                props.navigation.navigate("Home")
            }).catch(function (error) {
                setLoading(false)
                Alert.alert(error.message);
            });
        } else {
            setLoading(false)
            Alert.alert("Fill Form Properly!");
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
                <View style={{ marginHorizontal: 20, marginTop: '20%' }}>
                    <Card>
                        <CardItem>
                            <Body style={{ paddingHorizontal: 15, paddingVertical: 25 }}>
                                <View style={styles.TextBox}>
                                    <Icon color='#FF0000' size={20} name='md-person' />
                                    <Input onChangeText={text => setEmail(text)} placeholder='E-mail' />
                                </View>
                                <View style={{ marginVertical: 10 }} />
                                <View style={styles.TextBox}>
                                    <Octicons color='#FF0000' size={20} name='key' />
                                    <Input secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder='Password' />
                                </View>
                                <TouchableOpacity onPress={() => this.SignIn()} style={styles.Button}>
                                    <Text style={styles.ButtonText}>Login</Text>
                                </TouchableOpacity>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")} style={styles.SignUpBtn}>
                    <Text style={styles.LoginText}>Sign up</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

Login.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    LoginText: {
        marginLeft: 20,
        fontSize: 22,
        fontWeight: '600',

    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    Button: {
        backgroundColor: '#fbb040',
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        paddingHorizontal: 25,
        alignSelf: 'flex-end'
    },
    ButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    },
    TextBox: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#FF0000',
        borderBottomWidth: 2,
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
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
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
    SignUpBtn: {
        marginTop: '10%',
        alignSelf: "flex-end",
        marginRight: 20
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
});
