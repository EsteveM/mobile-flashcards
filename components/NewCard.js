// New Question View:
// This view shows:
// 		- An option to enter in the question
// 		- An option to enter in the answer
// 		- An option to submit the new question


import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { connect } from 'react-redux'

import { addCard } from '../actions'

import { addCardToDeck } from '../utils/api'

import { white, purple, lightPurp, black } from '../utils/colors'

class NewCard extends Component {
    state = {
        questionText: '',
        answerText: '',
    }
    onChangeQuestionText = (questionText) => {
        this.setState(() => ({
            questionText
        }))
    }
    onChangeAnswerText = (answerText) => {
        this.setState(() => ({
            answerText
        }))
    }
    // Creation of the new Card in the Redux Store and in the AsyncStorage. In addition, we go to
    // the Individual deck view
    submitCard = () =>  {  
        const { questionText, answerText } = this.state
        const { dispatch, navigation, deckTitle } = this.props

        dispatch(addCard(
                deckTitle,
                {
                    question: questionText,
                    answer: answerText,
                },
        ))

        addCardToDeck(
            deckTitle,
            {
                question: questionText,
                answer: answerText,
            },
        )

        navigation.navigate(
            'Deck', 
            { deckTitle: deckTitle }
        )

        this.setState(() => ({
            questionText: '',
            answerText: '',
        }))
    }
    render() {
        const { questionText, answerText } = this.state

        // Let's take into account the number of characters left so that the user is warned 
        // about it
        const questionTextLeft = 50 - questionText.length
        const answerTextLeft = 50 - answerText.length

        return (
            <View style={styles.container} >
                {/* Let's ask for the question of the card */}
                <TextInput
                    style={styles.textInput}
                    onChangeText={questionText => this.onChangeQuestionText(questionText)}
                    value={questionText}
                    placeholder={'What is the question of your card?'}
                    maxLength={50}
                    multiline={false}
                />
                {/* We warn the user when there are less than or equal to 10
                characters left to reach the maximum text length */}
                {questionTextLeft <= 10 && (
                    <Text style={{fontSize: 15, color: 'red'}}>
                        {`${questionTextLeft} characters left`}
                    </Text>
                )}
                {/* Let's ask for the answer of the card */}
                <TextInput
                    style={styles.textInput}
                    onChangeText={answerText => this.onChangeAnswerText(answerText)}
                    value={answerText}
                    placeholder={'What is the answer of your card?'}
                    maxLength={50}
                    multiline={false}
                />
                {/* We warn the user when there are less than or equal to 10
                characters left to reach the maximum text length */}
                {answerTextLeft <= 10 && (
                    <Text style={{fontSize: 15, color: 'red'}}>
                        {`${answerTextLeft} characters left`}
                    </Text>
                )}
                {/* Pressing the button correctly creates the question card and routes the 
                user to the Individual Deck view for the new deck */}
                { (questionText !== '' && answerText !== '') && (
                    <TouchableOpacity 
                        onPress={this.submitCard} 
                        style={{marginTop: 120}} >
                        <Text style={styles.button}>
                            Create Card
                        </Text> 
                    </TouchableOpacity>
                )}
                { (questionText === '' || answerText === '') && (
                    <TouchableOpacity 
                        onPress={this.submitCard} 
                        style={{marginTop: 120}} 
                        disabled= {true}>
                        <Text style={styles.disabledButton}>
                            Create Card
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
        width: 375,
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

// ADDING CONNECTION TO REDUX - mapStateToProps get passed the state and the current props, which
// has a navigation property on it. We get the deckTitle that we get when we route to Deck
function mapStateToProps (decks, { navigation, route }) {
    // the deckTitle is the key to the specific deck
    const { deckTitle } = route.params
    // now, what we return, what we want to pass to our component: the title/key of the deck
    return {
        deckTitle: deckTitle,
        // we also return a goBack function to return to the associated Individual Deck view
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps)(NewCard)

