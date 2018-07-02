import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { blue, white, orange, lightBlue } from '../utils/colors';
import { deleteDeck } from '../actions';
import { deckRemove } from '../utils/api';

class Deck extends Component {

  // Set the current deck title
  componentDidMount () {
    const {title} = this.props.navigation.state.params;
    this.props.navigation.setParams({ name: title });
  }

  //Removes a deck from asyncstorage and the store
  removeDeck = (title) => {
    const { dispatch, navigation } = this.props;
    dispatch(deleteDeck(title));
    deckRemove(title);
    navigation.goBack();
  }

  render() {
    const {navigation} = this.props;
    const {title} = navigation.state.params;
    const {decks} = this.props;

    if (!decks[title]) {
      return (
        <View style={styles.containerDelete}>
          <Text style={styles.deleting}>Deleting...</Text>
        </View>
      )
    }

    const deck = decks[title];
    return (
      <View style={styles.containerMain}>
        <View style={styles.containerTop}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.info}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.containerBottom}>
          <TouchableOpacity 
            style={styles.add}
            onPress={() => navigation.navigate("NewQuestion", {name: deck.title})}
          >
            <Text style={styles.addText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={deck.questions.length < 1 ? true : false}
            style={deck.questions.length < 1 ? styles.disabled : styles.start}
            onPress={() => navigation.navigate("Quiz", {name: deck.title})}
          >
            <Text style={styles.startText}>Start Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.delete}
            onPress={() => this.removeDeck(deck.title)}
          >
            <Text style={styles.deleteText}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: lightBlue,
  },
  containerTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerBottom: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 32,
    color: blue,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 18,
    color: '#777',
  },
  start: {
    backgroundColor: blue,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '50%'
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: blue,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '50%'
  },
  startText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
  add: {
    backgroundColor: white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: orange,
    width: '50%'
  },
  addText: {
    color: orange,
    fontSize: 20,
    textAlign: 'center',
  },
  deleting: {
    fontSize: 20,
    color: '#666'
  },
  delete: {
    backgroundColor: '#999',
    borderRadius: 10,
    padding: 8,
    marginTop: 40,
    width: '30%'
  },
  containerDelete: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  }
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Deck)