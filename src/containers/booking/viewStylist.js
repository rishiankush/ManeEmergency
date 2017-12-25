/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

import _ from 'lodash';
import Constants from '../../constants';
import BackIcon from '../../components/common/BackButton';
export default class ViewStylist extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { navigate } = this.props.navigation;
  	return(
      <View style={[styles.container]}>
        <BackIcon navigation={this.props.navigation}/>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white',fontWeight:"bold"}}>Under Development</Text>
        </View>
      </View>  
  	)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F19',
  },
});

