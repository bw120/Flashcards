import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';
import styled from 'styled-components/native';
import { getDeck } from '../utils/storage';
import { clearTodaysNotifications } from '../utils/notifications';
import FlipCard from 'react-native-flip-card'

class Quiz extends Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: `Quiz: ${navigation.state.params.deckTitle}`
    }
  };

  state = {
    showAnswer: false,
    currentCard: 0,
    correct: 0,
    incorrect: 0,
    deckInfo: {
      title: '',
      questions: []
    }
  }

  componentDidMount() {
    getDeck(this.props.navigation.state.params.deckTitle).then((results) => {
      const data = {
        ...results,
        questions: this.shuffleDeck(results.questions)
      }
      this.setState({deckInfo: data });
    });

    clearTodaysNotifications(this.props.navigation.state.params.deckTitle);
  }

  toggleAnswer = () => {
    this.setState({showAnswer: !this.state.showAnswer});
  }

  answerCorrect = () => {
    let questions = this.state.deckInfo.questions;
    let correct = this.state.correct;
    let incorrect = this.state.incorrect;
    
    if (this.state.deckInfo.questions[this.state.currentCard].answerCorrect !== true) {
      correct += 1;
    }
    if (this.state.deckInfo.questions[this.state.currentCard].answerCorrect === false) {
      incorrect -= 1;
    }

    questions[this.state.currentCard].answerCorrect = true;
    
    this.setState({
      ...this.state,
      showAnswer: false,
      correct,
      incorrect,
      deckInfo: {
        ...this.state.deckInfo,
        questions
      }
    });
    this.nextQuestion();
  }

  answerWrong = () => {
    let questions = this.state.deckInfo.questions;
    let correct = this.state.correct;
    let incorrect = this.state.incorrect;
    
    if (this.state.deckInfo.questions[this.state.currentCard].answerCorrect !== false) {
      incorrect += 1;
    }
    if (this.state.deckInfo.questions[this.state.currentCard].answerCorrect === true) {
      correct -= 1;
    }

    questions[this.state.currentCard].answerCorrect = false;
    
    this.setState({
      ...this.state,
      showAnswer: false,
      correct,
      incorrect,
      deckInfo: {
        ...this.state.deckInfo,
        questions
      }
    });
    this.nextQuestion();
  }

  nextQuestion = () => {
    
    if (this.state.currentCard < this.state.deckInfo.questions.length - 1) {
      this.setState({currentCard: this.state.currentCard + 1});
    } else {
      this.props.navigation.navigate('QuizResults', {score: this.getScore(), deckTitle: this.state.deckInfo.title });
    }
  }

  shuffleDeck = (questions) => {
    let cards = questions.slice();
    let numCards = questions.length;
    let shuffledDeck = [];

    for (let i = 0; i < numCards; i++) {
      let random = Math.floor(Math.random() * cards.length);
      shuffledDeck.push({card: cards[random], answerCorrect: null});
      cards.splice(random, 1);
    }
    return shuffledDeck;
  }

  getScore = () => {
    let correct = this.state.deckInfo.questions.filter((item) => ( item.answerCorrect ));
    return (correct.length / this.state.deckInfo.questions.length * 100).toFixed(2);
  }

	render() {
	  return (
      <Container>
        <InnerContainer>
        <Section >
  	      <H1>Card { this.state.currentCard + 1 } of { this.state.deckInfo.questions.length }</H1>
          <H2>{ this.state.correct } correct,  { this.state.incorrect } incorrect</H2>
        </Section>
        <CardSection>
          <FlipCard 
            style={{borderRadius: 5, borderWidth: 1, flex: 4, justifyContent: "center", alignItems: "center"}}
            friction={10}
            perspective={5000}
            flipHorizontal={true}
            flipVertical={true}
            flip={false}
            clickable={true}
          >
            {/* Face Side */}
            <CardContent>
              <H2>Question:</H2>
              <CeterText>{ (this.state.deckInfo.questions.length > 0 ) ? this.state.deckInfo.questions[this.state.currentCard].card.question : "" }</CeterText>
              <SmallText>(Tap to see the answer)</SmallText>
            </CardContent>
            {/* Back Side */}
            <CardContent>
              <H2>Answer:</H2>
              <CeterText>{(this.state.deckInfo.questions.length > 0 ) ? this.state.deckInfo.questions[this.state.currentCard].card.answer : ""}</CeterText>
              <SmallText>(Tap to go back to the question)</SmallText>
            </CardContent>
          </FlipCard>
        </CardSection>
        <Section>
          <CeterText>Did you get the answer correct?</CeterText>
          <Button onPress={() => this.answerCorrect()} style={{backgroundColor: '#00ff00'}}><ButtonText>Correct</ButtonText></Button>
          <Button onPress={() => this.answerWrong()} style={{backgroundColor: '#ff0000'}}><ButtonText>Wrong</ButtonText></Button>
        </Section>
  	    </InnerContainer>
      </Container>
	  )
	}
}

export default Quiz

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

const InnerContainer = styled.ScrollView`
  width: 100%;
  flex: 1;
  padding: 10px 60px;

`;

const H1 = styled.Text`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #2e2e2e;
  margin-bottom: 10px;
`;

const H2 = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  color: #2e2e2e;
  margin-bottom: 10px;
`;

const Section = styled.View`
  margin-bottom: 15px;
  margin-top: 10px;
  flex: 1;
  align-items: center;
`;

const CardSection = styled.View`
  margin-bottom: 15px;
  margin-top: 10px;
  flex: 5;
  align-items: stretch;
`;


const Button = styled.TouchableHighlight`
  margin: 10px;
  width: 200px;
  border-width: 1px;
  border-radius: 5px;
  border-color: #ccc;
  padding: 10px 20px;

`;

const CeterText = styled.Text`
  text-align: center;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: #ffffff;
  font-weight: bold;
`;

const SmallText = styled.Text`
  text-align: center;
  font-size: 10px;
`;

const CardContent = styled.View`
  width: 100%;
  height: 100px;
  margin: 10px 30px;
  flex: 1;
  justify-content: center;
`;
