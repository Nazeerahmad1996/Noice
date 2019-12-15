import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";

export default class CommentEmpty extends Component {

	//If no comments then this component will render
	render () {
		return (
			<View>
				<Text style={{padding: 20, textAlign: 'center', alignItems: 'center'}}>Empty</Text>
			</View>
		)
	}
}