import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Modal, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import { getDeck, deleteDeck } from '../utils/storage';

class DeckOverview extends Component {

    componentDidMount() {
        getDeck(this.props.navigation.state.params.name).then((data) => this.setState({ deckInfo: data }));
    }

    state = {
        deckInfo: {
            title: '',
            questions: []
        },
        modalWindowOpen: false
    }

    activateModal(open) {
        this.setState({ modalWindowOpen: open });
    }

    startQuiz = (title) => {
        this.props.navigation.navigate('Quiz', { deckTitle: title });
    }

    addCard = (title) => {
        this.props.navigation.navigate('AddCard', { deckTitle: title });
    }

    deleteDeck = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ]
        })
        this.props.navigation.dispatch(resetAction);
        this.props.screenProps.deleteDeck(this.props.screenProps.decks[this.props.navigation.state.params.name].title);
        this.activateModal(false);
    }

    render() {
    	const title = (this.props.screenProps.decks[this.props.navigation.state.params.name]) ? this.props.screenProps.decks[this.props.navigation.state.params.name].title : "";
    	const questions = (this.props.screenProps.decks[this.props.navigation.state.params.name]) ? this.props.screenProps.decks[this.props.navigation.state.params.name].questions : [];

        return (
            <ScrollView>
            <Container>
	    	<InnerContainer>
	    		<Section>
					<H1>{title}</H1>
					<Cards>{ questions.length } Cards</Cards>
					{
						(questions.length > 0) ? (
					
					<Button underlayColor='#ff5104'
							title={title}
					        onPress={() => this.startQuiz(title) }
					>
				  	<CeterText>
				  	 Start Quiz
				  	</CeterText>
		          	</Button>
		          	) : (
					<Button underlayColor='#ff5104'
							title={title}
					        onPress={() => this.addCard(title)}
					>
				  	<CeterText>
				  	 Add Cards
				  	</CeterText>
		          	</Button>
		          	)
		          }
	          	</Section>
	          	<Section>
	          	<H2>Options</H2>
	          		<OptionButton onPress={() => this.addCard(title)}>
		          		<Option>Add Card</Option>
	          		</OptionButton>
	          		<OptionButton onPress={() => this.activateModal(true)}>
		          		<Option>Delete Deck</Option>
	          		</OptionButton>

	          	</Section>


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalWindowOpen}
          >
         <Container>
         	<ModalContainer>
			<View>
            <ModalText>Are you sure you want to delete this deck?</ModalText>
			</View>
            <Button onPress={() => {
              this.deleteDeck()
            }}>
              <CeterText>Yes, please delete it</CeterText>
            </Button>

            <Button onPress={() => {
              this.activateModal(false)
            }}>
              <CeterText>Cancel</CeterText>
            </Button>
			</ModalContainer>
         </Container>
        </Modal>

          </InnerContainer>
	    </Container>
	    </ScrollView>

        )
    }
}

export default DeckOverview

const Container = styled.View `
	flex: 1;
	flex-direction: row;
	justify-content: center;
	padding: 20px;
`;

const InnerContainer = styled.View `
	flex: 1;
`;


const ModalContainer = styled.View `
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	padding: 30px 0 30px 0;

`;

const H1 = styled.Text `
	font-weight: bold;
	font-size: 20px;
	text-align: center;
	color: #383838;
	margin-bottom: 5px;
`;

const ModalText = styled.Text `
	font-weight: bold;
	font-size: 18px;
	text-align: center;
	color: #FF5204;
	margin-bottom: 5px;
`;

const H2 = styled.Text `
	font-weight: bold;
	font-size: 18px;
	text-align: center;
	color: #2e2e2e;
	margin-bottom: 10px;
`;

const Button = styled.TouchableHighlight `
	margin: 10px;
	border-width: 1px;
	border-radius: 5px;
	border-color: #ccc;
	paddingTop: 10px;
	paddingBottom: 10px;
	width: 50%;
`;

const OptionButton = styled.TouchableHighlight `
	margin: 10px;
`;

const CeterText = styled.Text `
	text-align: center;
	font-size: 16px;
`;

const Section = styled.View `
	margin-bottom: 15px;
	margin-top: 10px;
	flex: 1;
	align-items: center;
`;

const Option = styled.Text `
	color: #0E5EA5;
	font-weight: bold;
	text-align: center;
	font-size: 16px;
`;

const Cards = styled.Text `
	text-align: center;
	font-style: italic;
	color: #666;
	font-size: 14px;
`;