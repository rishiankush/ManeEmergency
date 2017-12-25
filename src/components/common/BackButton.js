/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Constants from '../../constants';

export default class BackButton extends Component<{}> {
  render() {
    const {navigate,goBack} = this.props.navigation;
    return (
      <View style={[styles.container,this.props.containerStyle]}>
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          underlayColor={Constants.Colors.Transparent} 
          style={[styles.button,this.props.buttonStyle]} onPress={()=>goBack()}
        >
          <Image
            source={Constants.Images.user.backIcon}
            style={[styles.backImage, this.props.imageStyle]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#1A1F19'
  },
  button:{
    backgroundColor:'#1A1F19',
    width:Constants.BaseStyle.DEVICE_WIDTH/100*12,
    marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*5
  },
  backImage:{
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100*4,
    height:Constants.BaseStyle.DEVICE_WIDTH/100*4.5,
    width:Constants.BaseStyle.DEVICE_WIDTH/100*7
  },
});
