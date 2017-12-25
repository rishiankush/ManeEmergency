/* *
 * @file: Root.js
 * @description: Adding react navigation and other abilities into the app
 * @date: 14.12.2017
 * @author: Ankush Rishi
 * */

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import Progress from './components/common/Progress'
import Navigator from "./config/navigator"
import { Toast } from 'react-native-redux-toast';
import Constants from './constants';
import strings from './utilities/StringEn'

export default class Root extends Component{
  /* *
   * @constructor: Default constructor
   * */
  constructor(props){
    super(props);
  }

  /* *
   * @function: Default render function
   * */
  render(){
    return (
        <View style={styles.container}>
        	<Progress/>
          <Navigator/>
          <Toast messageStyle={styles.toastStyle} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.White,
  },
  toastStyle:{
     color: Constants.Colors.White,
  }
});