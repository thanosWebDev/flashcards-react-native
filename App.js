import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { white, blue, gray } from './utils/colors';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import NewQuestion from './components/NewQuestion';
import { setLocalNotification } from './utils/helpers';


function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    inactiveTintColor: Platform.OS === 'ios' ? gray : '#87bad4',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerTintColor: white,
      headerStyle: { 
        backgroundColor: blue
      },
      headerTitleStyle: { 
        flexGrow: 1,
        textAlign: 'center',
        marginLeft: 0,
        marginRight: 56
      }
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: () => ({
      title: `Add Card to Deck`,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: { 
        flexGrow: 1,
        textAlign: 'center',
        marginLeft: 0,
        marginRight: 56
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      },
      headerTitleStyle: { 
        flexGrow: 1,
        textAlign: 'center',
        marginLeft: 0,
        marginRight: 56
      }
    })
  },

})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
    console.log("not1");
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={blue} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
