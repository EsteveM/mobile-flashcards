// Build out our reducer to handle the actions
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions'

// We have a single decks reducer
function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                // we want the state to be exactly the same as it is
                ...state,
                // but, we also want to merge action.decks on it.
                // decks is an object with its key representing a specific deck and the value 
                // being the specific title and questions for that deck
                ...action.decks
            }
        case ADD_DECK :
            return {
                ...state,
                // action.deck is the brand new deck, and merge it into the
                // state
                ...action.deck
            }
        case ADD_CARD :
            return {
                ...state,
                // action.card is the brand new card, and merge it into the
                // state
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat([action.card])
                }
            }
        case REMOVE_DECK :
            // action.title is the title/key of the deck to be removed
            // To have an approach to filter object properties by key in ES6, see
            // https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
            return Object.keys(state).
                        filter(key => key !== action.title).
                        reduce((obj, key) => {
                            obj[key] = state[key]
                            return obj
                        }, {})
        default :
            return state
    }
}

export default decks