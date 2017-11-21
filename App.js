import React from 'react';
import { 
         View, 
         Text, 
         StyleSheet, 
         TouchableOpacity, 
         ScrollView 
       } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styled from 'styled-components/native';
import FlashCardStatusBar from './components/FlashCardStatusBar';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Decks from './components/Decks';
import DeckOverview from './components/DeckOverview';
import Quiz from './components/Quiz';
import QuizResults from './components/QuizResults';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Notifications from './components/Notifications';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAllDecks, deleteDeck, newDeck, newCard } from './utils/storage';



const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={30} color={tintColor} />
    },
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-notifications-outline' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: "#ff5104",
    inactiveTintColor: "#2e2e2e",

    style: {
      height: 60,
      padding: 5,
      backgroundColor: "#898787",
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
      navigationOptions: {
        title: "All Decks",
        headerTintColor: "#383838",
    }
  },
  DeckOverview: {
    screen: DeckOverview,
    navigationOptions: {
      title: "Deck Overview",
      headerTintColor: "#383838",
      headerStyle: {
        backgroundColor: "#ccc",
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "#383838",
      headerStyle: {
        backgroundColor: "#ccc",
      }
    }
  },
  QuizResults: {
    screen: QuizResults,
    headerMode: "none",
    navigationOptions: {
      title: "Quiz Results",
      headerTintColor: "#383838",
      headerStyle: {
        backgroundColor: "#ccc",
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "Add/Edit Deck",
      headerTintColor: "#383838",
      headerStyle: {
        backgroundColor: "#ccc",
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: "#383838",
      headerStyle: {
        backgroundColor: "#ccc",
      }
    }
  }
})

export default class App extends React.Component {

  componentDidMount() {
    getAllDecks().then((data) => this.setState({ decks: data }));
  };

  removeDeck = (key) => {
    let decks = this.state.decks;
    decks[key] = undefined;
    delete decks[key];
    this.setState(decks);
    deleteDeck(key);
  }

  addDeck = (entry, key) => {
    let decks = this.state.decks;
    decks[key]= entry;
    this.setState(decks);
    newDeck(entry, key);
  }

  addCard = (entry, key) => {
    let decks = Object.assign({}, this.state.decks);
    decks[key].questions.push(entry);
    console.log(decks);
    this.setState(decks);
    newCard(entry, key);
  }

  state = {
    decks: []
  };

  render() {
    return (
        <View style={{flex: 1}}>
          <FlashCardStatusBar/>
          <MainNavigator screenProps={ {decks: this.state.decks, deleteDeck: this.removeDeck, addDeck: this.addDeck, addCard: this.addCard}}/>
        </View>
    );
  }
}

