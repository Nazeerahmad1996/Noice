import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import StarRating from 'react-native-star-rating';

import {ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import * as firebase from 'firebase';

// import avatar from '../../assets/images/avatar.png';

export default class CommentList extends Component {
    render() {
        const { comment } = this.props;
        var user = firebase.auth().currentUser;
        var photoUrl;

        if (user != null) {
            photoUrl = user.photoURL;
        }
        return (

            <ListItem style={{ marginBottom: 15, marginLeft: 0 }}>
                <Body>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={comment.rating}
                        containerStyle={{ width: 80 }}
                        starSize={15}
                    />

                    <Text note numberOfLines={2}>{comment.comment}</Text>
                </Body>
                <Right>
                    <Text note>{comment.user}</Text>
                </Right>
            </ListItem>

        )
    }
}