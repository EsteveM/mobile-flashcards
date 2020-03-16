// Deck List View (Default View): 
// This view:
// 		- displays the title of each Deck
// 		- displays the number of cards in each deck

import React, { Component } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native'

import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

import { getDecks } from '../utils/api'

// APPLOADING - Until the App is ready we want to show a Loading screen (in order to minimise 
// unwanted effects when the App is refreshed).
import { AppLoading } from 'expo'

import { gray, white } from '../utils/colors'

import { useNavigation } from '@react-navigation/native'

// FLATLIST: This is the component to be rendered for each item in the flat list
function Decks ({ title, questions }) {
    // ANIMATION - we want to add some animations to the text of the deck when it is selected. We 
    // want to animate that change and bounce the text a little bit. We import Animated. 
    // We also add a bounceValue to the state.
    // NAVIGATION - useNavigation is a hook which gives access to navigation object when we cannot
    // or do not want to pass it into the component
    // see: https://reactnavigation.org/docs/use-navigation
    const navigation = useNavigation()
    // it starts at 1 
    const bounceValue = new Animated.Value(1)
    return (
        // NAVIGATION - Once the user clicks on a deck on the home view, they navigate to the deck
        // view for the clicked deck
        // ANIMATION - we want to take our bounceValue and animate. The first animation is going to be
        // timed. After that, we want to do an spring animation.
        <TouchableOpacity onPress={() => {
            Animated.sequence([
                Animated.timing(bounceValue, { duration: 100, toValue: 1.24 }),
                Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
            ]).start(() => {navigation.navigate('Deck', { deckTitle: title })})
            }
        }>
            <View style={styles.item}>
                {/* ANIMATIONS - Instead of Text components, we will have Animated.Text
                components. In addition, we add a transform to the style. Now, as the 
                bounceValue is changing, this is going to scale and transform this specific
                text. */}
                <Animated.Text 
                    style={[styles.title, {transform: [{scale: bounceValue}]}]}>
                        {title} 
                </Animated.Text>
                <Animated.Text  style={{fontSize: 32, color: gray, transform: [{scale: bounceValue}]}} >
                    {questions.length} {questions.length === 1 ? 'card' : 'cards'}
                </Animated.Text>
            </View>
        </TouchableOpacity>
    )
}

class DeckList extends Component {
    // APPLOADING - we want to have a property on our state called ready
    state = {
        ready: false,
    }    
    // When this component mounts, we want to fetch our deck results
    componentDidMount() {
        const { dispatch } = this.props

        // We call getDecks, get all of our decks, and then we dispatch receiveDecks, 
        // which will eventually add them to the current state
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            // APPLOADING - When the previous .then happens, it's all finished and we run 
            // this.setState and set ready to true
            .then(() => this.setState(() => ({
                ready: true,
            })))
    }
    // FLATLIST: renderItem will receive a parameter item which is the item we are 
    // mapping over
    renderItem = ({ item }) => {
        return <Decks {...item} />
    }
    render() {
        // Let's grab decks, which is our whole deck list, which is coming from this.props
        const { decks } = this.props

        // APPLOADING - Until we are ready, we show this loading component 
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View style={{flex: 1}}>
                {/* FLATLIST - In order to render only the items the user can currently see, we 
                use FlatLlist. It needs two things, the data, and a method renderItem which is going
                to be responsible for rendering the actual item.
                */}
                <FlatList
                    data={decks}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

// STYLING - Let's create some styles
const styles = StyleSheet.create({
    // Let's style the main container
    item: {
        backgroundColor: white,
        // the borderRadious depends on the Platform in our UI
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        // we want to align everything on the main axis in the center
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
    },
})

function mapStateToProps (decks) {
    // we return the decks with keys so that list items are correspondingly keyed afterwards
    const keyedValuesDecks = Object.values(decks).map((deck) => {
        return {
            ...deck,
            key: deck.title,
        }
    }) 
    return {
        // we sort the decks alphabetically
        decks: keyedValuesDecks.sort((a,b) => b.title < a.title),
    }
} 

// we connect our component so that we get access to this.props.dispatch
export default connect(mapStateToProps)(DeckList)