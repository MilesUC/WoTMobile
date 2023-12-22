import React, { useState, useRef } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'

const ExpandingTextInput = ({ placeholder, value, onChangeText, onBlur, error }) => {
  const [text, setText] = useState('')
  const [inputHeight, setInputHeight] = useState(40) // Initial height
  const inputRef = useRef(null)
  const handleTextChange = (newText) => {
    setText(newText)
    setInputHeight(Math.max(40, Math.ceil(newText.length / 20) * 20))
  }

  return (
    <>
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        inputRef.current.focus()
      }}
    >
      <TextInput
        ref={inputRef}
        style={[
          styles.textInput, styles.input,
          error && styles.errorTextInput
        ]}
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </TouchableOpacity>
    <View style={{ marginVertical: 5 }}>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#D9D9D9'
  },
  input: {
    fontFamily: 'MontserratLight',
    color: '#5A5A5A',
    fontSize: 14,
    padding: '4%'
  },
  errorText: {
    fontFamily: 'MontserratLight',
    fontSize: 12,
    fontWeight: '400',
    color: 'red'
  }
})

export default ExpandingTextInput
