import { AsyncStorage } from 'react-native';
import { formatDecks } from  './helpers';

// Key for flashcards asyncstorage
export const DECKS_STORAGE_KEY = 'flashcards';

//Get all decks from asyncstorage
export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => formatDecks(results))
    .catch((error)=> console.log(`error get: `, error));
}

//Create/add a new deck in asyncstorage
export function saveDeckTitle (title) {
  const newDeck = {
      title,
      questions: []
  }
  AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({[title]: newDeck})
  )
  return {[title]: newDeck}
}

// Delete e deck from asyncstorage
export function deckRemove (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      delete data[title];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
    .catch((error)=> console.log(`error: `, error));
}

// Add a card in an existig deck
export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title].questions.push(card);
      AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({[title]: data[title]})
      )
    })
    .catch((error)=> console.log(`error: `, error));
}