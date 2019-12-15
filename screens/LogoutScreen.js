import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class Logout extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		firebase.auth().signOut()
			.then(() => {
				this.props.navigation.navigate("Login")
			})
			.catch(error => {

			})
	}

	render() {
		return null;
	}
}