import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedMatIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class Decks extends Component {

    componentDidMount() {
        this.animatedStyles(this.props.screenProps.decks);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.screenProps !== this.props.screenProps) {
	        this.animatedStyles(nextProps.screenProps.decks);
	    }
    };

	state = {
		opacity: {},
		color: {}
	}

	//create animated values in state for the color and opacity of each deck
	animatedStyles = (decks) => {
		if (decks != null) {
			let opacity = {};
			let color = {};
			Object.keys(decks).forEach((item) => { 
				opacity[item] = new Animated.Value(1); 
				color[item] = new Animated.Value(1); 
			});
			this.setState( {
				opacity,
				color
			});
		}
	}

	selectDeck = (key) => {

		const { opacity, color } = this.state;

		//array of items to animate
		let animatedItems = [];

		//array of items to reset after navigating to deck
		let animatedBack = [];

		Object.keys(opacity).forEach((item) => { 
			if (item != key) {
				animatedItems.push(Animated.timing(opacity[item], {toValue: 0, duration: 700}));
				animatedBack.push(Animated.timing(opacity[item], {toValue: 1, duration: 1}));
			} else {
				animatedItems.push(Animated.timing(color[item], {toValue: 0, duration: 700}));
				animatedBack.push(Animated.timing(color[item], {toValue: 1, duration: 1}));
			}
		});

		//Animate opacity and color on all simultaniously.
		Animated.parallel(animatedItems).start(() => {

			//navigate to deck overview after animation is complete
			this.props.navigation.navigate('DeckOverview', {name: key})
			Animated.parallel(animatedBack).start();
		});
	}

	render() {
	  return (
	  	<ScrollView>
		    <Container>
		    	<InnerContainer>

			      <H1>Decks</H1>
			      
					{
					  Object.keys(this.props.screenProps.decks).map((item) => ( 
					  	<Animated.View style={{opacity: this.state.opacity[item]}} key={this.props.screenProps.decks[item].title} >
						  	<Deck onPress={() => {this.selectDeck(item)}}>
						      	<View>
						      	<IconContainer>
						          	<AnimatedMatIcon name='cards' size={50} style={{color: (this.state.color[item]) ? this.state.color[item].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['rgba(255,82,4,1)', 'rgba(14,94,165,1)']
                    }) : "#0E5EA5"}} />
						        </IconContainer>
						      	<DeckName>
						          	 {this.props.screenProps.decks[item].title}
						      	</DeckName>
						      	<Cards>
						      	 {this.props.screenProps.decks[item].questions.length } Cards 
						      	</Cards>
						      	</View>
						  	</Deck>
					  	</Animated.View>
					  ))
					}

				</InnerContainer>
		    </Container>
	    </ScrollView>
	  )
	}
}

export default Decks

const Container = styled.View `
	flex: 1;
	flex-direction: row;
	justify-content: center;
	padding: 20px;
`;

const InnerContainer = styled.View `
	flex: 1;
`;

const IconContainer = styled.View `
	flex: 1;
	flex-direction: row;
	justify-content: center;
`;

const H1 = styled.Text `
	font-weight: bold;
	font-size: 20px;
	text-align: center;
	color: #383838;
	margin-bottom: 5px;
`;

const DeckName = styled.Text`
	text-align: center;
	paddingTop: 10px;
	paddingBottom: 10px;
	font-weight: bold;
	font-size: 16px;
	color: #3A8B00;
`;

const Deck = styled.TouchableOpacity`
	margin: 10px;
	border-width: 1px;
	border-radius: 5px;
	border-color: #ccc;
	paddingTop: 10px;
	paddingBottom: 20px;
`;

const Cards = styled.Text`
	text-align: center;
	font-style: italic;
	color: #666;
`;

