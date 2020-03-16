import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import DeckList from './components/DeckList'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'

// NAVIGATION - see https://reactnavigation.org/docs/getting-started/
//              see https://reactnavigation.org/docs/bottom-tab-navigator/ 
//              see https://reactnavigation.org/docs/stack-navigator/
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Constants from 'expo-constants'

// ADDING REDUX - We hook up Redux and React-Redux into our application 
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

// STATUS BAR - We make our own custom status bar: FlashCardsStatusBar.
function FlashCardsStatusBar ({backgroundColor, ...props}) {
  return (
    // STATUS BAR - Height will be different in ios and Android, we find it in the Constants package
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// NAVIGATION - We create our tabs component. 
const Tabs = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="DeckList"
      navigationOptions={{
        // NAVIGATION - We get rid of any headers
        header: null
      }} 
      tabBarOptions = {{
        // NAVIGATION - The color of the selected tab
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 106,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0,0,0,0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        }
      }}
    >
      {/* NAVIGATION - DeckList tab */}
      <Tabs.Screen
        name="DeckList"
        component={DeckList}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => <Ionicons 
                                            name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
                                            size={30} 
                                            color={tintColor}
                                          />}}
      />
      {/* NAVIGATION - NewDeck tab */}
      <Tabs.Screen
        name="NewDeck"
        component={NewDeck}
        options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>}}
      />
    </Tabs.Navigator>
  )
}

// NAVIGATION - Stack navigator. The properties are going to be our new routes
const MainNavigator = createStackNavigator()

function MyMainNavigator() {
  return (
    <MainNavigator.Navigator
      screenOptions={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }} 
    >
      <MainNavigator.Screen name="Home" component={MyTabs} />
      <MainNavigator.Screen name="Deck" component={Deck} />
      <MainNavigator.Screen name="Quiz" component={Quiz} />
      <MainNavigator.Screen name="NewCard" component={NewCard} />
    </MainNavigator.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor={purple} barStyle='light-content' />
          <MyMainNavigator />
        </View>
      </NavigationContainer>
    </Provider>
  )
}