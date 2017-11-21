import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { newCard } from '../utils/storage';
import styled from 'styled-components/native';

class AddCard extends Component {

    state = {
        question: "",
        answer: "",
        feedback1: "",
        feedback2: ""
    }

    //Save and add new question
    addQuestion = () => {
        if (this.saveCard()) {
            this.props.navigation.navigate('AddCard', { deckTitle: this.props.navigation.state.params.deckTitle });
        }
    }

    //if form fields filled out, submit card data
    saveCard = () => {
        let feedback1 = (this.state.question.length < 1) ? "Please enter a question" : "";
        let feedback2 = (this.state.answer.length < 1) ? "Please enter the answer" : "";

        if (feedback1.length < 1 && feedback2.length < 1) {
            let question = {
                question: this.state.question,
                answer: this.state.answer
            }
            this.props.screenProps.addCard(question, this.props.navigation.state.params.deckTitle);
            return true;
        }

        this.setState({
            ...this.state,
            feedback1,
            feedback2
        });
        return false;
    }

    //save and return home
    returnHome = () => {
        if (this.saveCard()) {
            this.props.navigation.navigate('DeckOverview', {name: this.props.navigation.state.params.deckTitle});
        }
    }

    render() {
    	console.log(this.props)
        return (
            <ScrollView>
            <Container>
		    	<InnerContainer>
			      <H1>Add A Card</H1>

			      <LabelText>Enter Question:</LabelText>
			      <InputText 
			      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			      onChangeText={(text) => this.setState({question: text})}
			      value={this.state.name}
			      />
			      <ErrorText>{this.state.feedback1}</ErrorText>

			      <LabelText>Enter Answer:</LabelText>
			      <InputText 
			      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			      onChangeText={(text) => this.setState({answer: text})}
			      value={this.state.name}
			      />
			      <ErrorText>{this.state.feedback2}</ErrorText>

			      <Section>
				      <Button onPress={() => (this.addQuestion())}>
				          <CeterText>Save, Add New Question</CeterText>
			          </Button>
				      <Button onPress={() => (this.returnHome())}>
				          <CeterText>Save, Return to Deck</CeterText>
			          </Button>
		          </Section>

	          </InnerContainer>
		    </Container>
	    </ScrollView>
        )
    }
}

export default AddCard;

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