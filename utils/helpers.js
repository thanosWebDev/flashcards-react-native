import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './api';
import { Notifications, Permissions } from 'expo';

// Set dummy data on first load, for testing, when asyncstorage is empty
export function setDummyData () {
  const decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

//If asyncstorage has data, format and load them or create dummy data
export function formatDecks (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}


// NOTOFICATIONS

//Notification key for asyncstorage
const NOTIFICATION_KEY = 'FlashCards:notification';

//Clear notifications
export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

//Create a new notification item
function createNotification () {
  return {
    title: 'Take a Quiz!',
    body: "👋 don't forget to take a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

//Set local notification in a specific time using asyncstorage
export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
          .catch((error) => {
            console.warn('Error getting permission: ', error)
          })
      }
    })
}