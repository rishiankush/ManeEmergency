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

export default class Filters extends Component<{}> {
  render() {
    return (
      <View style={[styles.container,this.props.containerStyle]}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={Constants.Images.home.distanceFilter} style={styles.filterStyle} resizeMode='stretch'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={Constants.Images.home.distanceFilter} style={styles.filterStyle} resizeMode='stretch'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={Constants.Images.home.distanceFilter} style={styles.filterStyle} resizeMode='stretch'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={Constants.Images.home.distanceFilter} style={styles.filterStyle} resizeMode='stretch'/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#1A1F19',
    flexDirection:'row'
  },
  filterStyle:{
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 *18
  },
  imageContainer:{
    flex:1,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    alignItems:'center'
  }
});
