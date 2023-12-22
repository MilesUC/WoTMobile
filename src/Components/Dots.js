import React from 'react'
import { View } from 'react-native'
import { Dot } from './Dot'

export const Dots = (props) => {
  return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            {Array.from({ length: props.total }).map((_, index) => (
                <Dot key={index} isSelected={index === props.selectedIndex} />
            ))}
        </View>
  )
}
