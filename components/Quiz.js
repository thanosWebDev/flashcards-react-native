import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { blue, white, lightBlue, gray, black, red } from '../utils/colors';
import { clearLocalNotification, setLocalNotification} from '../utils/helpers';

class Quiz extends Component {

  state = {
    flip: false,
    correct: 0,
    counter: 1
  }

  // Flips the question/answer quiz card
  flip = () => {
    this.setState((state) => ({
      flip: !state.flip
    })
  )}

  // Updates the state when correct button is pressed
  correct = () => {
    this.setState((state) => ({
      correct: state.correct + 1,
      counter: state.counter + 1,
      flip: false
    }))
  }
  // Updates the state when incorrect button is pressed
  incorrect = () => {
    this.setState((state) => ({
      counter: state.counter + 1,
      flip: false
    }))
  }

  // Calculates the percentage of correct answers
  // Updates the notification when quiz is completed
  resultsPercent = () => {
    const {correct} = this.state;
    const {name} = this.props.navigation.state.params;
    const deck = this.props.decks[name];
    const totalCards = deck.questions.length;
    // Config notification
    clearLocalNotification()
      .then(setLocalNotification);
    return Math.round(100 * (correct / totalCards));
  }

  // Restarts the quiz and ressets the state
  resetQuiz = () => {
    this.setState(() => ({
      correct: 0,
      counter: 1,
      flip: false
    }))
  }

  render() {
    const {name} = this.props.navigation.state.params;
    const deck = this.props.decks[name];
    const {flip, correct, counter} = this.state;

    // When quiz questions end, show the result
    if (counter > deck.questions.length) {
      const result = this.resultsPercent();
      return (
        <View style={styles.containerResult}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.result}>{result}%</Text>
          <TouchableOpacity
            style={styles.resultButton}
            onPress={() => this.resetQuiz()}
          >
            <Text style={styles.correctText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resultButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.correctText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.containerMain}>
        <Text style={styles.counter}>{counter} / {deck.questions.length}</Text>

        {!flip && (
          <TouchableOpacity
            style={styles.containerCard}
            onPress={() => this.flip()}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>
              {deck.questions[counter - 1].question}
              </Text>
            </View>
            <Text style={styles.flip}>tap card to show answer</Text>
          </TouchableOpacity>
        )}

        {flip && (
          <TouchableOpacity
            style={styles.containerCard}
            onPress={() => this.flip()}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>
              {deck.questions[counter - 1].answer}
              </Text>
            </View>
            <Text style={styles.flip}>tap card to show question</Text>
          </TouchableOpacity>
        )}

        <View style={styles.containerBottom}>
          <TouchableOpacity 
            style={styles.correct}
            onPress={() => this.correct()}
          >
            <Text style={styles.correctText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.incorrect}
            onPress={() => this.incorrect()}
          >
            <Text style={styles.correctText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: lightBlue
  },
  containerCard: {
    backgroundColor: white,
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    margin: 15,
    shadowColor: black,
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    padding: 15,
    elevation: 2
  },
  containerBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counter: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: gray
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 26,
    color: blue,
    fontWeight: '600',
    textAlign: 'center'
  },
  flip: {
    fontSize: 14,
    color: red,
    marginBottom: 5
  },
  correct: {
    backgroundColor: blue,
    padding: 15,
    borderRadius: 10,
    width: '50%'
  },
  correctText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
  incorrect: {
    backgroundColor: gray,
    padding: 15,
    borderRadius: 10,
    width: '50%',
    marginTop: 25
  },
  containerResult: {
    flex: 1,
    backgroundColor: lightBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultText: {
    fontSize: 28,
    color: gray,
    textAlign: 'center'
  },
  result: {
    color: blue,
    fontSize: 60,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 50
  },
  resultButton: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 10,
    width: '50%',
    marginBottom: 20
  },
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)