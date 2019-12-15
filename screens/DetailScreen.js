import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Container, Content, Body, Text, List, Right, Button, ListItem } from 'native-base';
import { ImageBackground, Dimensions, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, AsyncStorage, Linking, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PostRating from '../components/PostRating';
import PostForm from '../components/PostForm';
import PostComments from '../components/PostComment';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var { height, width } = Dimensions.get('window');

export default class PostDetails extends Component {

    constructor(props) {
        super(props)
        const { params } = props.navigation.state;
        this.state = {
            item: params.item,
        };
    }

    render() {

        const { item } = this.state;
        var user = firebase.auth().currentUser;

        return (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* <KeyboardAwareScrollView> */}
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../assets/images/background.png')} style={styles.postDetail_background}>
                    </ImageBackground>
                    <View style={{ backgroundColor: '#fff', borderTopRightRadius: 25, borderTopLeftRadius: 25, marginTop: -40, marginVertical: 10 }}>
                        <View style={{ margin: 15, marginBottom: 5 }}>



                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.postDetail_tag}>{item.Name}</Text>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                        <Ionicons color="#fbb040" size={26} name='md-close-circle-outline' />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* <Text style={styles.postDetail_tag}>{item.Name}</Text> */}
                            <Text note>{item.Email}</Text>
                            {/* <Text style={styles.postDetail_title}>{item.Title}</Text> */}
                            <PostRating postId={item.Node} />

                            <Button transparent>
                                <Ionicons color="#fbb040" size={20} name='md-calendar' />
                                <Text style={styles.postDetail_date}>{item.Date}</Text>
                            </Button>
                            <Text note>{item.Description}</Text>
                        </View>


                        {/* <Text style={{ padding: 15, fontWeight: 'bold' }}>{Strings.ST83}</Text> */}


                        <View style={{ height: 1, backgroundColor: '#EEE', width: width, marginBottom: 5 }}></View>

                        <View style={{ margin: 15 }}>
                            <PostForm item={item} postId={item.Node} />
                        </View>

                        <Text style={{ padding: 15, fontWeight: 'bold' }}>Comment</Text>
                        <View style={{ height: 1, backgroundColor: '#EEE', width: width, marginBottom: 0 }}></View>

                        <View style={{ margin: 15, marginTop: 0 }}>
                            <PostComments postId={item.Node} />
                        </View>
                    </View>
                </View>
                {/* </KeyboardAwareScrollView> */}
            </ScrollView>
        );
    }
}

PostDetails.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    title_posts_categories: {
        color: '#FFF',
        fontSize: 13,
        padding: 10,
        fontWeight: 'bold',
        paddingTop: 2
    },

    date_posts: {
        color: 'rgba(255,255,255,0.50)',
        fontSize: 11,
        padding: 10,
        paddingBottom: 0,
        fontWeight: 'bold'
    },

    gradient_posts_2columns: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height * 0.15,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },

    background_posts_2columns: {
        width: width * 0.46,
        height: height * 0.15,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },

    postDetail_background: {
        width: width,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
    },

    postDetail_gradient: {
        position: 'absolute',
        padding: 15,
        left: 0,
        right: 0,
        bottom: 0,
        height: height * 0.10,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
    },

    postDetail_title: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 5,
        lineHeight: 30,
    },

    postDetail_tag: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#fbb040',
        lineHeight: 30,
        flex:1
    },

    postDetail_date: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#333',
        marginLeft: 0,
        paddingLeft: 8
    },

    postCommentButton: {
        backgroundColor: '#fbb040',
        elevation: 0,
        shadowOpacity: 0
    },

    postCommentText: {
        color: '#FFFFFF'
    },
});
