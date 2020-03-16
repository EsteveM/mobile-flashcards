// Quiz View:
// This view shows:
// 		- displays a card question
// 		- an option to view the answer (flips the card)
// 		- a "Correct" button
// 		- an "Incorrect" button
// 		- the number of cards left in the quiz
// 		- Displays the percentage correct once the quiz is complete

import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'

import { connect } from 'react-redux'

import { white, purple, green, red } from '../utils/colors'

import { Foundation } from '@expo/vector-icons'

// LOCAL NOTIFICATIONS - 
import { clearLocalNotification, setLocalNotification} from '../utils/helpers'

class Quiz extends Component {
    state = {
        // it tracks the current question shown to the user. Initially, it is the first one.
        currentQuestion: 0,
        // it tracks whether the side of the card currently shown to the user is 'front' or 'back'.
        // Initially, it is front, i.e. it shows the question, and not yet the answer.
        cardSide: 'front',
        // it tracks the number of questions answered correctly
        correctAnswers: 0,
        // it supports an animation when the score is shown, and starts at 1
        bounceValue: new Animated.Value(1),
    }
    render() {
        const { navigation, deck, goBack } = this.props
        const { title, questions } = deck
        const { currentQuestion, cardSide, correctAnswers, bounceValue } = this.state

        // Let's display the title of the Quiz
        navigation.setOptions({
            title: `${title} deck quiz`
        })

        // If the deck has no cards, we warn the user about the fact that it is not possible
        // to take a quiz
        if (questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Foundation name='alert' size={50}/>
                    <Text style={{fontSize: 32}}>
                        Sorry, you cannot take a quiz because there are no cards in the deck.
                    </Text>
                </View>
            )
        }

        const quizFinished = (currentQuestion === questions.length)

        // Once the quiz has finished, we want to animate the text that shows the score
        if (quizFinished) {
            Animated.sequence([
                Animated.timing(bounceValue, { duration: 100, toValue: 1.24 }),
                Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
            ]).start()
            
            // LOCAL NOTIFICATIONS - 
            // Clear local notification for the user to complete a quiz for this day
            // We call clearLocalNotification, and when that's finished, we can just set up
            // another one that will set up a notification for tomorrow at 8 o'clock.
            clearLocalNotification()
                .then(setLocalNotification)
        }

        return (
            <View style={styles.container} >
                <View style={styles.container}>
                    {/* If the quiz has not finished, we show number of questions remaining and either
                    question or answer */}
                    {(!quizFinished) && (
                        <Fragment>
                            <View style={{flex: 1}}>
                                {/* The view displays the number of questions remaining. */}
                                <Text style={{fontSize: 20}}>
                                    {`Question ${currentQuestion + 1} out of ${questions.length}`}
                                </Text>
                            </View>
                            <View style={{flex: 1}}>
                                {/* The Quiz view starts with a question from the selected deck */}
                                {(cardSide === 'front') && (
                                    <Text style={{fontSize: 33}}>{questions[currentQuestion].question}</Text>
                                )}
                                {/* Pressing the 'Show Answer' button displays the answer */}
                                {(cardSide === 'back') && (
                                    <Text style={{fontSize: 33}}>{questions[currentQuestion].answer}</Text>
                                )}
                            </View>
                        </Fragment>
                    )}
                    {/* If the quiz has finished, we show the score */}
                    {(quizFinished) && (
                        // When the last question is answered, a score is displayed. This is 
                        // displayed as a percentage of correct answers. 
                        // In addition, the text is animated.
                        <View style={{flex: 1}}>
                            <Animated.Text style={{fontSize: 33, transform: [{scale: bounceValue}]}}>
                                {`You answered ${Math.round((correctAnswers / questions.length)*100)}% of the questions correctly`}
                            </Animated.Text>
                        </View>
                    )}
                </View>
                <View style={styles.container}>
                    {/* If the quiz has not finished, we show the "Show Answer/Question", "Correct",
                    and "Incorrect" options */}
                    {(!quizFinished) && (
                        <Fragment>
                            {/* The question is displayed, along with a button to show the answer */}
                            {(cardSide === 'front') && (
                                <TouchableOpacity onPress={() => {
                                    this.setState(() => ({ cardSide: 'back' }))
                                }} style={{marginTop: 30}}>
                                    <Text style={styles.showAnswer}>
                                        Show Answer
                                    </Text> 
                                </TouchableOpacity>
                            )}
                            {(cardSide === 'back') && (
                                <TouchableOpacity onPress={() => {
                                    this.setState(() => ({ cardSide: 'front' }))
                                }} style={{marginTop: 30}}>
                                    <Text style={styles.showQuestion}>
                                        Show Question
                                    </Text> 
                                </TouchableOpacity>
                            )}
                            {/* Buttons are included to allow the student to mark their guess as 'Correct' */}
                            <TouchableOpacity onPress={() => {
                                this.setState(() => (
                                    {
                                        cardSide: 'front',
                                        correctAnswers: correctAnswers + 1,
                                        currentQuestion: currentQuestion + 1
                                    }
                                ))
                            }} style={{marginTop: 30}}>
                                <Text style={styles.correct}>
                                    Correct
                                </Text> 
                            </TouchableOpacity>
                            {/* Buttons are included to allow the student to mark their guess as 'Incorrect' */}
                            <TouchableOpacity onPress={() => {
                                this.setState(() => (
                                    {
                                        cardSide: 'front',
                                        currentQuestion: currentQuestion + 1
                                    }
                                ))
                            }} style={{marginTop: 30}}>
                                <Text style={styles.incorrect}>
                                    Incorrect
                                </Text> 
                            </TouchableOpacity>
                        </Fragment>
                    )}
                    {/* When the score is displayed, buttons are displayed to either start the quiz
                    over or go back to the Individual Deck view. */}
                    {(quizFinished) && (
                        <Fragment>
                            {/* A button is included to start the quiz over */}
                            <TouchableOpacity onPress={() => {
                                this.setState(() => (
                                    {
                                        cardSide: 'front',
                                        correctAnswers: 0,
                                        currentQuestion: 0
                                    }
                                ))
                            }} style={{marginTop: 30}}>
                                <Text style={styles.restartQuiz}>
                                    Restart Quiz
                                </Text> 
                            </TouchableOpacity>
                            {/* A button is included to go back to the Individual Deck view */}
                            <TouchableOpacity onPress={() => {
                                goBack()
                            }} style={{marginTop: 30}}>
                                <Text style={styles.backToDeck}>
                                    Back to Deck
                                </Text> 
                            </TouchableOpacity>
                        </Fragment>
                    )}
                </View>
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
    showAnswer: {
        fontSize: 25, 
        color: white, 
        backgroundColor: purple, 
        padding: 25,
    },
    showQuestion: {
        fontSize: 25, 
        color: white,
        backgroundColor: purple, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 18,
        paddingRight: 16,
    },
    correct: {
        fontSize: 25, 
        color: white, 
        backgroundColor: green, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 58,
        paddingRight: 58,
    },
    incorrect: {
        fontSize: 25, 
        color: white, 
        backgroundColor: red, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 51,
        paddingRight: 51,
    },
    restartQuiz: {
        fontSize: 25, 
        color: white, 
        backgroundColor: purple, 
        padding: 25,
    },
    backToDeck: {
        fontSize: 25, 
        color: white, 
        backgroundColor: purple, 
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 21,
        paddingRight: 21,
    },
})

// ADDING CONNECTION TO REDUX - mapStateToProps get passed the state and the current props, which
// has a navigation property on it. We get the deckTitle that we get when we route to Deck
function mapStateToProps (decks, { navigation, route }) {
    // the deckTitle is the key to the specific deck
    const { deckTitle } = route.params
    // now, what we return, what we want to pass to our component: the information about the deck
    return {
        deck: decks[deckTitle],
        // we also return a goBack function to return to the associated Individual Deck view
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps)(Quiz)