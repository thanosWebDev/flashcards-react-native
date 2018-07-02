import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { blue, lightBlue } from '../utils/colors';
import { connect } from 'react-redux';
import Card from './Card';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';

class DeckList extends Component {

  //Load all decks from asyncstorage and update the store
  componentDidMount () {
    const { dispatch } = this.props;
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)));
  }

  render() {
    const {myDecks, navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.image} source={require('../assets/cards.png')}/>
        <Text style={styles.logo}>Mobile Flash Cards</Text>
        <View style={styles.container}>
          {myDecks.length < 1 && (
            <Text style={styles.emptyDeck}>
            You do not have any Decks.{"\n"}
            Add a new one from the menu below
            </Text>
          )}
          <FlatList
            style={styles.list}
            data={myDecks}
            renderItem={({item}) => {
              return <Card {...item} key={item.title} navigation={navigation}/>
            }}
            keyExtractor={(item) => item.title}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: lightBlue,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    paddingTop: 6
  },
  logo: {
    fontSize: 32,
    color: blue,
    fontWeight: 'bold',
    marginBottom: 30
  },
  emptyDeck: {
    fontSize: 16,
    color: blue,
    textAlign: 'center',
    paddingTop: 30
  },
  image: {
    marginTop: 40,
    width: 100,
    height: 100
  }
});

function mapStateToProps (decks) {
  return {
    myDecks: Object.values(decks)
  }
}

export default connect(mapStateToProps)(DeckList)