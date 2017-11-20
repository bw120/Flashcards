import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'FlashCards:decks';

let defaultTime = new Date();

defaultTime.setHours(17,0,0,0);

//Initial data if none is in storage
const initial_seed_data = {
  React: {
    title: 'React',
    notifications: {
        active: false,
        time: defaultTime.toString()
    },
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      },
      {
        question: 'Question 3',
        answer: 'Answer 3'
      },
      {
        question: 'Question 4',
        answer: 'Answer 4'
      },
      {
        question: 'Question 5',
        answer: 'Answer 5'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    notifications: {
        active: false,
        time: defaultTime.toString()
    },
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

function clearData () {
  return AsyncStorage.removeItem(DECKS_KEY)

}

export function getAllDecks () {
  // clearData();
  return AsyncStorage.getItem(DECKS_KEY)
    .then((data) => { 
      if (data === null) {
        AsyncStorage.setItem(DECKS_KEY, JSON.stringify(initial_seed_data))
        return initial_seed_data;
      }
      return JSON.parse(data);
    })
}

export function getDeck (id) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results) => { 
      const data = JSON.parse(results);
      return data[id] || {};
    })
}

export function newDeck (entry, key) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function deleteDeck (key) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
    })
}

export function newCard (entry, key) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key].questions.push(entry)
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
    })
}

export function updateAllNotifications (notifications) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      Object.keys(notifications).forEach((item) => {
          data[item].notifications = notifications[item];
      });
      console.log(data);
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
    })
}

