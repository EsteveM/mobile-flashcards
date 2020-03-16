// utils/_decks.js

import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'FlashCards:decks9'

const deckData = { 
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'Combination of function and lexical environment within which that function was declared.'
      }
    ]
  },
  CICD: {
    title: 'CICD',
    questions: [
      {
        question: 'What is a container?',
        answer: 'Bundled environment containing tools, libraries and other components to run an app'
      },
      {
        question: 'What’s the current most-popular version control tool?',
        answer: 'Git.'
      },
    ]
  },
  Splunk: {
    title: 'Splunk',
    questions: [
      {
        question: 'What are the components of Splunk?',
        answer: 'Forwarders, Indexers and Search Heads.'
      },
      {
        question: 'What are the different types of forwarders?',
        answer: 'Heavy and Universal.'
      }
    ]
  },
  Logging: {
    title: 'Logging',
    questions: [
      {
        question: 'Why is logging important?',
        answer: 'To understand how your application behaves in production, and to debug.'
      }
    ]
  },
  Blockchain: {
    title: 'Blockchain',
    questions: [
      {
        question: 'What is the main purpose of web3.js?',
        answer: 'Interact with data on the Ethereum network.'
      },
      {
        question: 'Which endpoints are available for you to connect to from the Infura dashboard?',
        answer: 'Mainnet, Ropsten, Kovan, and Rinkeby.'
      },
      {
        question: 'Smart Contracts written in Solidity, are declared with the keyword:',
        answer: 'contract.'
      },
      {
        question: 'Smart Contracts can have variable declarations outside any function.',
        answer: 'True.'
      },
      {
        question: 'Smart Contracts can have a constructor function.',
        answer: 'True.'
      }
    ]
  },
  MongoDB: {
    title: 'MongoDB',
    questions: []
  }
}
                  

// ASYNC STORAGE - We set the initial data for our app
function setDeckData () {
    
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deckData))

  return deckData
}

export function formatDeckResults (results) {
  return results === null
    ? setDeckData()
    : JSON.parse(results)
}