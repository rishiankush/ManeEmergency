'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput
} from 'react-native';
import Constants from '../../constants';

export default class FormTextInput extends Component{
  constructor(props){
    super(props);
    this.state={
      isFocused   : false,
      focusColor  : Constants.Colors.Gray,
      borderBottomWidth : 1
    }
  }

  // Function calls the parent class onBlur function
  onBlur() {
    this.setState({ isFocused: false});
    if(this.props.onBlur){
      this.props.onBlur();
    }
  }

  onFocus(){
    let colour = this.props.focusColor ? this.props.focusColor : Constants.Colors.White;
    this.setState({ isFocused: true, focusColor  : colour, borderBottomWidth : 2});
    if(this.props.onFocus)
      this.props.onFocus();
  }

  focus(){
    this.refs.inputBox.focus()
  }

  onChange(event){
    if(this.props.onChange){
      this.props.onChange(event)
    }
  }

  render(){
    let {
      headerText, placeHolderText, placeHolderColor,
      keyboard, secureText, returnKey, SubmitEditing,
      isPassword, showPassword, multiline, inputStyle, autoFocus,
      editable,value,imageSource, maximumLength
    } = this.props;

    return(
      <View style={[styles.viewStyle,{
        borderColor:this.state.focusColor,
        borderWidth:this.state.borderBottomWidth
      },this.props.style]}>
        <Image source={imageSource} style={styles.image} resizeMode='contain' />
        <TextInput
          ref={"inputBox"}
          autoFocus={autoFocus}
          underlineColorAndroid="transparent"
          style={[styles.inputStyle,inputStyle]}
          autoCapitalize={"none"}
          value={value}
          placeholder={placeHolderText}
          placeholderTextColor={this.state.focusColor}
          keyboardType={keyboard}
          secureTextEntry={secureText}
          editable={editable}
          onChangeText={(text) => this.props.onChangeText(text)}
          onChange={(event) => this.onChange(event)}
          returnKeyType={returnKey}
          autoCorrect={false}
          onSubmitEditing={SubmitEditing}
          onFocus={() => this.onFocus()}
          onBlur={() => this.setState({ isFocused: false, focusColor  : Constants.Colors.Gray,borderBottomWidth:1 })}
          multiline={multiline}
          maxLength={this.props.maximumLength}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection:'row',
    borderColor: Constants.Colors.Gray,
    borderWidth: 2,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*3/100,
    //marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*3
  },
  inputStyle: {
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    height: Constants.BaseStyle.DEVICE_HEIGHT/100*7,
    textAlign: 'left',
    color: Constants.Colors.White,
    width:Constants.BaseStyle.DEVICE_WIDTH/100 * 75,
  },
  image:{
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2.5,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2.2,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
  }
});