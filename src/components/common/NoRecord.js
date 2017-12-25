/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Constants from '../../constants';

export default class NoRecord extends Component {
  render(){
  	return(
      <View style={styles.container}>
        <Text style={[styles.info,this.props.textStyle]}>{this.props.info}</Text>
      </View>
  	)
  }
}

NoRecord.defaultProps = {
  info : "No Records Found."
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F19',
    alignItems:"center",
    justifyContent:"center",
  },
  info: {
    textAlign: 'center',
    color: '#fff',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*35,
  },
});
