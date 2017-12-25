/*
 * @file: FormSubmitButton.js
 * @description: Submit button component
 * @date: 15.12.2017
 * @author: Ankush Rishi
 * */

'use strict';

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Constants from '../../constants';

export default class FormSubmitButton extends Component{
  constructor(props){
    super(props);
  }

  // Default render function
  render(){

    let { buttonStyle, textStyle} = this.props;

    return(
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.button,buttonStyle]}
        onPress={this.props._Press}
      >
        <Text style={[styles.text, textStyle]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: Constants.BaseStyle.DEVICE_HEIGHT*7/100,
    backgroundColor: '#FCE495',
    width: Constants.BaseStyle.DEVICE_WIDTH*90/100,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH/100*10,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
  },
  text: {
    color: '#1A1F19',
    fontSize: 18,
    fontWeight: '600',
  }
});
