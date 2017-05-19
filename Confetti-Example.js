'use strict'
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
}
import Confetti from './Confetti';

export default class Party extends Component {
  render() {
    return (
      <View style={{height:"100%"}}>
        <View style={{position:"absolute", left: "50%", top: 300}}>
          <Confetti
            ref={(ref) => this._confetti = ref}
            colors={['#a864fd','#29cdff','#78ff44']}
            />
        </View>
        <TouchableOpacity
          onPress={() => this._confetti.start().then(() => alert("Party's over..."))}
          style={{position:"absolute", bottom: 50, width:"100%", alignItems:"center"}}
        >
          <Text>Shoot the confettis!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
