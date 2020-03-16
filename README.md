# Mobile Flashcards Project

This project implements an application that allows a student to study collections of flashcards. The student will be able to create categories of flashcards named decks, add cards to those decks, and take quizzes on them. The application has been built from scratch using React Native and Redux.

This application has been tested on an iOS simulator. In particular, on an iPhone 11, OS 13.3 (17C45), model number A2111.

## Table of Contents

* [Description of the Project](#description-of-the-project)
* [Getting Started](#getting-started)
* [Contributing](#contributing)
* [Acknowledgment](#acknowledgment)

## Description of the Project

As has already been mentioned, this project implements an application to make it possible for students to study groups of cards. With this aim in view, React Native and Redux has been used. The work that has been done is best described by explaining its main views:

* *Deck List View (Default View)*: it displays the title of each Deck, and the number of cards in each deck.
* *Individual Deck View*: it displays the title of the Deck, the number of cards in the deck, an option to start a quiz on this specific deck, and an option to add a new question to the deck.
* *Quiz View*: it displays a card question, an option to view the answer (flips the card), a "Correct" button, an "Incorrect" button, the number of cards left in the quiz, and the percentage correct once the quiz is complete.
* *New Deck View*: it displays an option to enter in the title for the new deck, and an option to submit the new deck title.
* *New Question View*: it displays an option to enter in the question, an option to enter in the answer, and an option to submit the new question.

## Getting Started

These are the steps to be followed to further develop and/or test this project:

* Firstly, you have to download/clone the project files from this repository onto your local machine. Then, cd into the root folder where the project files are located.
* Secondly, you have to run `npm install` and `npm start` to install all project dependencies, and start the development server, respectively. You should be able to view it in the browser at *http://localhost:19002/*. Then, you can choose where to run the app. This app, as already mentioned, has been tested in an iOS simulator. In particular, on an iPhone 11, OS 13.3 (17C45), model number A2111.
![expo](/ScreenShots/expo.png)
* Thirdly, the application can be manually tested:
    * The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.
    ![simulator1](/ScreenShots/simulator1.png)
    * Pressing on a deck in the list should generate an animation, and the app should route to an individual deck view. We can then see that the individual deck view includes the deck title, the number of cards in the deck, an option to start a quiz for that deck, an option to add a new question to the deck, and an option to delete the deck. The last one is an optional and interesting addition to this project.
    ![simulator2](/ScreenShots/simulator2.png)
    * Pressing the 'Start a Quiz' or 'Add Card' button properly routes to the correct views for those activities. The New Question view includes a form with fields for a question and answer, and a submit button. The Quiz view starts with a question from the selected deck. The question is displayed, along with a button to show the answer. Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'. The view displays the number of questions remaining.
    ![simulator3](/ScreenShots/simulator3.png)
    ![simulator4](/ScreenShots/simulator4.png)
    * In the New Question view, submitting the form correctly adds the question to the deck.
    ![simulator5](/ScreenShots/simulator5.png)
    ![simulator6](/ScreenShots/simulator6.png)
    ![simulator7](/ScreenShots/simulator7.png)
    * In the Quiz View, pressing the 'Show Answer' button displays the answer.
    ![simulator8](/ScreenShots/simulator8.png)
    * When the last question is answered, a score is displayed. This is displayed as a percentage of correct answers.
    ![simulator9](/ScreenShots/simulator9.png)
    * The New Deck view includes a form for creating a new deck - which is just an input for the title and a 'Create Deck' button. Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.
    ![simulator10](/ScreenShots/simulator10.png)
    ![simulator11](/ScreenShots/simulator11.png)
    * Logic for notification has been implemented. Notifications are generated at a specific time if the user hasn't completed at least one quiz for that day.
    * Finally, it can be observed that the code runs without errors.
    ![expo2](/ScreenShots/expo2.png)

## Contributing

This repository contains all the work that makes up the project. Individuals and I myself are encouraged to further improve this project. As a result, I will be more than happy to consider any pull requests.

## Acknowledgment

This project was bootstrapped with [create-react-native-app](https://github.com/react-community/create-react-native-app).

This project has been built up from scratch, and belongs to the Udacity's React & Redux course.
