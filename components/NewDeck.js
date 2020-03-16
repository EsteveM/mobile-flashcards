// New Deck View
// This view shows:
// 		- An option to enter in the title for the new deck
// 		- An option to submit the new deck title

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { connect } from 'react-redux'

import { addDeck } from '../actions'

import { saveDeckTitle } from '../utils/api'

import { white, purple, lightPurp, black } from '../utils/colors'

class NewDeck extends Component {
    state = {
        text: '',
    }
    onChangeText = (text) => {
        this.setState(() => ({
            text
        }))
    }
    // Creation of the Deck in the Redux Store and in the AsyncStorage. In addition, we go to the
    // Individual deck view
    submitDeck = () =>  {  
        const { text } = this.state
        const { dispatch, navigation } = this.props

        dispatch(addDeck({
            [text]: {
                title: text,
                questions: [],
            }
        }))

        saveDeckTitle(text)

        navigation.navigate(
            'Deck', 
            { deckTitle: text }
        )

        this.setState(() => ({
            text: ''
        }))
    }
    render() {
        const { text } = this.state

        // Let's take into account the number of characters left so that the user is warned 
        // about it
        const textLeft = 25 - text.length

        return (
            <View style={styles.container} >
                {/* Let's ask the deck title */}
                <Text style={{fontSize: 35}}>What is the title of the new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.onChangeText(text)}
                    value={text}
                    placeholder={'Deck Title'}
                    maxLength={25}
                    multiline={false}
                />
                {/* We warn the user when there are less than or equal to 10
                characters left to reach the maximum text length */}
                {textLeft <= 10 && (
                    <Text style={{fontSize: 15, color: 'red'}}>
                        {`${textLeft} characters left`}
                    </Text>
                )}
                {/* Pressing the button correctly creates the deck and routes the 
                user to the Individual Deck view for the new deck */}
                { (text !== '') && (
                    <TouchableOpacity 
                        onPress={this.submitDeck} 
                        style={{marginTop: 120}} >
                        <Text style={styles.button}>
                            Create Deck
                        </Text> 
                    </TouchableOpacity>
                )}
                { (text === '') && (
                    <TouchableOpacity 
                        onPress={this.submitDeck} 
                        style={{marginTop: 120}} 
                        disabled= {true}>
                        <Text style={styles.disabledButton}>
                            Create Deck
                        </Text> 
                    </TouchableOpacity>
                )}         
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
    textInput: {
        color: black,
        fontSize: 25,
        borderColor: 'gray', 
        borderWidth: 2,
        height: 40,
        marginTop: 30,
        width: 325,
    },
    button: {
        fontSize: 25, 
        color: white, 
        backgroundColor: purple, 
        padding: 25,
    },
    disabledButton: {
        fontSize: 25, 
        color: white, 
        backgroundColor: lightPurp, 
        padding: 25,
    }
})

export default connect()(NewDeck)

