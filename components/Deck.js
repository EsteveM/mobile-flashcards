// Individual Deck View:
// This view shows:
// 		- displays the title of the Deck
// 		- displays the number of cards in the deck
// 		- displays an option to start a quiz on this specific deck
// 		- An option to add a new question to the deck

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'

import { removeDeck } from '../actions/index'

import { removeFromDecks } from '../utils/api'

import { gray, white, purple } from '../utils/colors'

class Deck extends Component {
    // Deletion of the Deck in the Redux Store and in the AsyncStorage. In addition, we go back to the
    // home view
    deleteDeck = () =>  {  
        const { dispatch, navigation, deckTitle } = this.props

        dispatch(removeDeck(deckTitle))

        removeFromDecks(deckTitle)

        // go back to the home page
        navigation.goBack()
    }
    render() {
        const { navigation, deck } = this.props

        // If the deck has been deleted the render returns nothing (null)
        if (!deck) { return null }

        const { title, questions } = deck

        // Let's display the title of the Deck
        navigation.setOptions({
            title: `${title} deck`
        })

        return (
            <View style={styles.container} >
                {/* Let's display the title of the Deck */}
                <Text style={{fontSize: 60}}>{title}</Text>
                {/* Let's display the number of cards in the deck */}
                <Text style={{fontSize: 32, color: gray}}>
                    {questions.length} {questions.length === 1 ? 'card' : 'cards'}
                </Text>
                {/* Let's display an option to start a quiz on this specific deck */}
                <TouchableOpacity onPress={() => navigation.navigate(
                    'Quiz',
                    { deckTitle: title }
                    )} style={{marginTop: 120}}>
                        <Text style={styles.button}>
                            Start Quiz
                        </Text> 
                </TouchableOpacity>
                {/* Let's display an option to add a new question to the deck */}
                <TouchableOpacity onPress={() => navigation.navigate(
                    'NewCard',
                    { deckTitle: title }
                    )} style={{marginTop: 10}}>
                        <Text style={styles.newCardButton}>
                            Add Card
                        </Text> 
                </TouchableOpacity>
                {/* Let's display an option to delete the deck */}
                <TouchableOpacity 
                    onPress={this.deleteDeck}
                    style={{marginTop: 10}}>
                        <Text style={styles.deleteButton}>
                            Delete Deck
                        </Text> 
                </TouchableOpacity>
            </View>
        )
    }
}

// Let's add some styles here for our container
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // we want to align everything on the main axis in the center
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        padding: 15,
    },
    button: {
        fontSize: 25, 
        color: white, 
        backgroundColor: purple, 
        padding: 25,
    },
    newCardButton: {
        fontSize: 25, 
        color: white, 
        backgroundColor: purple, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 28,
        paddingRight: 28,
    },
    deleteButton: {
        fontSize: 25, 
        color: white, 
        backgroundColor: purple, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 13,
        paddingRight: 13,
    }
})

// ADDING CONNECTION TO REDUX - mapStateToProps get passed the state and the current props, which
// has a navigation property on it. We get the deckTitle that we get when we route to Deck
function mapStateToProps (decks, { navigation, route }) {
    // the deckTitle is the key to the specific deck
    const { deckTitle } = route.params
    // now, what we return, what we want to pass to our component: the information about the deck
    return {
        deckTitle: deckTitle,
        deck: decks[deckTitle],
        // we also return a goBack function to return to the associated Individual Deck view
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps)(Deck)