// There are four actions to update our Redux Store:
//     The first one is when we add a new deck
//     The second one is when we fetch all of the decks from our database
//     The third one is when we add a new question to a deck
//     The fourth one is when we remove a deck
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

// Creation of action creators
// The first action creator is addDeck, which receives a deck, and returns an action which is 
// just an object which has a type of ADD_DECK, and passes along the deck as well
export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}
// The second one is receiveDecks, which receives all of the decks and returns an action which
// has a type of RECEIVE_DECKS and passes along the decks
export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}
// The third action creator is addCard, which receives a title and a card, and returns an action
// which is just an object which has a type of ADD_CARD, and passes along the title as well as
// the card
export function addCard (title, card) {
    return {
        type: ADD_CARD,
        title,
        card,
    }
}
// The fourth action creator is removeDeck, which receives a title, and returns an action
// which is just an object which has a type of REMOVE_DECK, and passes along the title
export function removeDeck (title) {
    return {
        type: REMOVE_DECK,
        title,
    }
}

