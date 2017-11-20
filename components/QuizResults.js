import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';

class QuizResults extends Component {

  resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home'})
    ]
  });

  toHome = () => {
  	this.props.navigation.dispatch(this.resetAction);
  }

  toQuiz = () => {
    this.props.navigation.navigate('Quiz', {deckTitle: this.props.navigation.state.params.deckTitle});
  }

  toOverview = () => {
    this.props.navigation.navigate('DeckOverview', {name: this.props.navigation.state.params.deckTitle});
  }

  getMessage = (score) => {
    if (score > 89) {
      return "Your Awesome!";
    }
    if (score > 79) {
      return "Good Job!"
    }
    return "Nice try, but maybe you could do better"
  }

	render() {
	  return (
      <ScrollView>
        <Container>
          <InnerContainer>
            <Section>
              <H1>{this.getMessage(this.props.navigation.state.params.score)}</H1>
              <H2>You got {this.props.navigation.state.params.score}% correct.</H2>
            </Section>
            <Section>
              <Button onPress={() => this.toQuiz()}>
                <CeterText>Try Again</CeterText>
              </Button>
              <Button onPress={() => this.toOverview()}>
                <CeterText>Go to Deck Overview</CeterText>
                </Button>
      	      <Button onPress={() => this.toHome()}>
                <CeterText>Back to Dashboard</CeterText>
              </Button>
            </Section>
          </InnerContainer>
        </Container>
      </ScrollView>
	  )
	}

}

export default QuizResults


const Container = styled.View `
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`;

const InnerContainer = styled.View `
  flex: 1;
`;

const Section = styled.View `
  margin-bottom: 15px;
  margin-top: 10px;
  flex: 1;
  align-items: center;
`;

const H1 = styled.Text `
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  color: #3A8B00;
  margin-bottom: 5px;
`;

const H2 = styled.Text `
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  color: #0E5EA5;
  margin-bottom: 10px;
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

const CeterText = styled.Text `
  text-align: center;
`;