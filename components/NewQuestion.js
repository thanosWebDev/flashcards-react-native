import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { blue, white, red, lightBlue } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { createCard } from '../actions';

class NewQuestion extends Component {

  state = {
    question: "",
    answer: "",
    warning: false
  }

  // Creates a new question/answer pair (card) for an existing deck
  // It gets saved in asyncstorage and the sto store is being updated
  newCard = (title) => {
    const { warning: value, ...card } = this.state;
    const { dispatch, navigation } = this.props;
    const {question, answer} = this.state;
    // Check if input fields are empty
    if (question && answer) {
      addCardToDeck(title, card)
        .then(() => dispatch(createCard(title, card)));
      this.setState(() => ({question: "", answer: "", warning: false }))
      navigation.goBack();
    } else {
      this.setState(() => ({warning: true}))
    }
  }

  handleAnswerChange = (text) => {
    this.setState(() => ({answer: text}))
  }
  handleQuestionChange = (text) => {
    this.setState(() => ({question: text}))
  }

  render() {
    const {question, answer, warning} = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <Text style={styles.title}>
        Write{"\n"}
        question & answer{"\n"}
        for the new card
        </Text>
        <View style={styles.containerBottom}>
          <TextInput 
            value={question}
            style={styles.input}
            name="question"
            onChangeText={this.handleQuestionChange}
            placeholder={"Question"}
            placeholderTextColor={'#999'}
          />
          <TextInput 
            value={answer}
            style={styles.input}
            name="answer"
            onChangeText={this.handleAnswerChange}
            placeholder={"Answer"}
            placeholderTextColor={'#999'}
          />
          {warning && (
            <Text style={styles.warning}>Please fill both fields</Text>
          )}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => this.newCard(this.props.navigation.state.params.name)}
          >
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createButton: {
    padding: 20,
    marginTop: 20,
    backgroundColor: blue,
    borderRadius: 10,
    width: '70%'
  },
  text: {
    color: white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center'
  },
  input: {
    borderColor: blue,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: white,
    width: '70%',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25
  },
  title: {
    fontSize: 32,
    color: blue,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 35,
    textAlign: 'center'
  },
  containerBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  warning: {
    color: red,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: 'center',
  }
});

export default connect()(NewQuestion)