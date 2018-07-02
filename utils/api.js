import { AsyncStorage } from 'react-native';
import { formatDecks } from  './helpers';

export const DECKS_STORAGE_KEY = 'flashcards';

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => formatDecks(results))
    .catch((error)=> console.log(`error get: `, error));
}

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

export function deckRemove (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      delete data[title];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    })
    .catch((error)=> console.log(`error: `, error));
}

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