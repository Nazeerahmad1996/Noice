import React, { Component } from 'react';
import { options, Comment } from './Comment';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text } from 'native-base';
import * as firebase from 'firebase';

export default class PostForm extends Component {
    constructor() {
        super();

        this.state = {
            userName: '',
            comment: {
                comment: '',
                rating: 1,
                user: ''
            }
        };
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        if (user) {
            var userN = ''
            var that = this;
            firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
                userN = snapshot.val() && snapshot.val().Name;
                that.setState({userName:userN});
                console.log(userN)
                that.setState((prevState, props) => {
                    return {
                        comment: {
                            comment: '',
                            rating: 1,
                            user: userN,
                        }
                    }
                });
            });
        }
    }

    addComment = async () => {
        var user = firebase.auth().currentUser;
        var userName = ''
        if (user) {
            firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
                userName = snapshot.val() && snapshot.val().Name;
            });
        }
        const validate = this.refs.form.getValue();

        if (validate) {
            let data = {};
            let comment = Object.assign({}, validate);
            let ref = firebase.database().ref().child('postComments');
            const key = ref.push().key;

            data[`${this.props.postId}/${key}`] = comment;

            ref.update(data).then(() => {
                this.setState((prevState, props) => {
                    return {
                        comment: {
                            comment: '',
                            rating: 1,
                            user: this.state.userName,
                        }
                    }
                });
            })
        }
        else {
            Alert.alert("Empty Form!")
        }
    }

    onChange(comment) {
        this.setState({ comment });
        console.log(comment)
    }

    render() {
        const { comment } = this.state;
        return (
            <View>
                <Form
                    ref="form"
                    type={Comment}
                    options={options}
                    value={comment}
                    onChange={(v) => this.onChange(v)}
                />
                <Button block onPress={this.addComment.bind(this)} style={styles.postCommentButton}>
                    <Text style={styles.postCommentText}>Submit</Text>
                </Button>

            </View>


        )
    }
}


const styles = StyleSheet.create({
    postCommentButton: {
        backgroundColor: '#fbb040',
        elevation: 0,
        shadowOpacity: 0
    },

    postCommentText: {
        color: '#FFFFFF'
    },
})