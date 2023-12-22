import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { ButtonToCompleteData } from '../../Components/ButtonToCompleteData'

const BlockScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.square}>
        <MaterialIcons name="app-blocking" size={50} color="#EE4296" />
        <Text style={styles.message}>Completa los datos de tu perfil para {props.message}.</Text>
        <ButtonToCompleteData/>
      </View>
    </View>
  )
}

const squareSize = Dimensions.get('window').width * 0.8 // 80% of screen width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  square: {
    width: squareSize,
    height: squareSize,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  message: {
    marginVertical: '10%',
    fontFamily: 'MontserratBold',
    color: '#5A5A5A',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default BlockScreen
