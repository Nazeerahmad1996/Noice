import React from 'react';
import {View, Slider, Text} from "react-native";
import StarRating from 'react-native-star-rating';

//Review View of stars
export default sliderTemplate = (locals) => {
	const help = (
		<Text style={{marginBottom: 8}}>{locals.help}</Text>
	);

	return (

		<View>
			<StarRating
			ref="input"
        	disabled={false}
        	maxStars={5}
        	rating={parseInt(locals.value)}
        	containerStyle={{width: 180}}
        	starSize={30}
        	selectedStar={value => locals.onChange(value)}
      		/>
			{help}
		</View>
	)
}