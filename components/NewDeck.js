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
import { blue, white, lightBlue, red } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';
import { createDeck } from '../actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class NewDeck extends Component {

  state = {
    input: "",
    warning: false
  }

  // Create a new deck in asyncstorage and updates the store
  // Then show the new deck's screen
  newDeck = () => {
    const {input} = this.state;
    const {navigation} = this.props;

    // Check if the input field is empty
    if (input) {
      const { dispatch } = this.props;
      const newDeck = saveDeckTitle(input);
      dispatch(createDeck(newDeck));
      this.setState(() => ({input: "", warning: false}));
      navigation.replace("Home", {}, navigation.navigate('Deck', {title: input }))
    } else {
      this.setState(() => ({warning: true}));
    }
  }

  handleTextChange = (input) => {
    this.setState(() => ({input}))
  }

  render() {
    const {input, warning} = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <MaterialCommunityIcons
          style={styles.icon}
          name='cards'
          size={70}
          color={blue}
        />
        <Text style={styles.title}>
        What is the title{"\n"}
        of your new deck?
        </Text>
        <View style={styles.containerBottom}>
          <TextInput 
            value={input}
            style={styles.input}
            onChangeText={this.handleTextChange}
            placeholder={"Awsome title"}
            placeholderTextColor={'#999'}
          />
          {warning && (
            <Text style={styles.warning}>Please write a title</Text>
          )}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => this.newDeck()}
          >
            <Text style={styles.text}>Create Deck</Text>
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
    marginTop: 50,
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
    textAlign: 'center'
  },
  title: {
    fontSize: 32,
    color: blue,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  icon: {
    marginTop: 50,
  },
  containerBottom: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  warning: {
    color: red,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },

});

export default connect()(NewDeck)