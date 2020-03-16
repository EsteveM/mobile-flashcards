// We are using AsyncStorage (React Native LocalStorage component)
import { AsyncStorage } from 'react-native'
// We persist the information inside of our AsyncStorage in DECK_STORAGE_KEY
import { DECK_STORAGE_KEY, formatDeckResults } from './_decks'

// getDecks: return all of the decks along with their titles, questions, and answers.
export function getDecks () {
    // We get all of the items living in the DECK_STORAGE_KEY
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        // We format the results before returning them
        .then(formatDeckResults)
}

// getDeck: take in a single id argument and return the deck associated with that id
export function getDeck (id) {
    return getDecks()
            .then((decks) => decks[id])
}

// saveDeckTitle: take in a single title argument and add it to the decks. 
// Add it to our 'DB' or our AsyncStorage on the phone using mergeItem
export function saveDeckTitle (title) {
    // what we are going to merge into the AsyncStorage is a stringified version of this object
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: [],
        },
    }))
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of 
// questions for the deck with the associated title.
// Add it to our 'DB' or our AsyncStorage on the phone using mergeItem
export function addCardToDeck (title, card) {
    // what we are going to merge into the AsyncStorage is a stringified version of this object
    getDeck(title).then((deck) => {
                            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                                [title]: {
                                    title: title,
                                    questions: deck.questions.concat([card]),
                                },
                            }))
                        }
                    )
}
// For removeFromDecks we remove the item at this key from our AsyncStorage
export function removeFromDecks (title) {
    // first, we get everything at this location
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
    // then, once we have this information, results, we parse it, delete what is at this key 
    // property, and then use setItem for the data once we have removed the specific key, and once 
    // we have stringified it
        .then((results) => {
            const data = JSON.parse(results)
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
} 