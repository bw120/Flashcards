import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';

class AddDeck extends Component {

	state = {
		name: "",
		feedback: "",
	}

	createDeck = () => {

		if (this.state.name.length < 3) {
			this.setState({feedback: "The deck name must be at least 3 letters"});
		} else if (this.props.screenProps.decks[this.state.name]) {
			this.setState({feedback: "That deck name already exists. Please choose another name."});
		} else {
			this.setState({feedback: ""});
			let defaultTime = new Date();
			defaultTime.setHours(17,0,0,0);
			const deckInfo =  {
					title: this.state.name,
				    notifications: {
				        active: false,
				        time: defaultTime.toString()
				    },
					questions: []
			}
			this.props.screenProps.addDeck(deckInfo, deckInfo.title);
			this.props.navigation.navigate('DeckOverview', {name: this.state.name});
		}
	}

	render() {
	  return (
    	<ScrollView>
            <Container>
		    	<InnerContainer>
			      <H1>Add A Deck</H1>
			      <LabelText>Deck Name:</LabelText>
			      <InputText 
			      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			      onChangeText={(text) => this.setState({name: text})}
			      value={this.state.name}
			      />
			      <ErrorText>{this.state.feedback}</ErrorText>
			      
			      <Section>
				      <Button onPress={() => (this.createDeck())}>
				          <CeterText>Save</CeterText>
			          </Button>
		          </Section>

	          </InnerContainer>
		    </Container>
	    </ScrollView>
	  )
	}

}

export default AddDeck;

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
	margin-bottom: 15px;
`;

const CeterText = styled.Text `
	text-align: center;
`;

const LabelText = styled.Text `
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 5px;
`;

const ErrorText = styled.Text `
	text-align: center;
	color: #FF5204;
	font-size: 16px;
	margin: 5px;
`;

const InputText = styled.TextInput `
	border-width: 1px;
	border-radius: 5px;
	border-color: #ccc;
`;

const Button = styled.TouchableOpacity `
	margin: 10px;
	border-width: 1px;
	border-radius: 5px;
	border-color: #ccc;
	paddingTop: 10px;
	paddingBottom: 10px;
	width: 50%;
`;

const Section = styled.View `
	margin-bottom: 15px;
	margin-top: 10px;
	flex: 1;
	align-items: center;
`;