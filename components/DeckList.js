import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { blue, white, lightBlue } from '../utils/colors';
import { connect } from 'react-redux';
import Card from './Card';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';

class DeckList extends Component {

  componentDidMount () {
    const { dispatch } = this.props;
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)));
  }


  render() {
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.image}
          source={require('../assets/cards.png')}
        />
        <Text style={styles.logo}>Mobile Flash Cards</Text>

        <View style={styles.container}>

          {this.props.myDecks.length < 1 && (
            <Text style={styles.emptyDeck}>You do not have any Decks.{"\n"}Add a new one from the menu below</Text>
          )}
          <FlatList
            style={styles.list}
            data={this.props.myDecks}
            renderItem={({item})=>{return <Card {...item} key={item.title} navigation={this.props.navigation}/>}}
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