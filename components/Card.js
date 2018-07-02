import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, blue, gray, black } from '../utils/colors'

export default function Card ({navigation, title, questions}) {
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('Deck',{title})}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{questions.length} Cards</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
    paddingTop: 25,
    paddingBottom: 25,
    margin: 8,
    shadowColor: black,
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    flex: 1,
    borderLeftWidth: 4,
    borderColor: blue,
    alignSelf: "stretch",
    alignItems: 'center',
    elevation: 3
  },
  title: {
    fontSize: 18,
    color: blue,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 14,
    color: gray,
  }
});