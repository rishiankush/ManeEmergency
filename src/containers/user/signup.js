/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative,{
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Constants from '../../constants';
import Background from '../../components/common/Background';
import BackIcon from '../../components/common/BackButton';
import FormTextInput from '../../components/common/FormTextInput';
import FormSubmitButton from '../../components/common/SubmitButton';
import ReactMixin from "react-mixin";
import TimerMixin from "react-timer-mixin";
import _ from "lodash";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from '../../redux/modules/user';
import Regex from '../../utilities/Regex';

class Signup extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      fullName:this.props.navigation.state.params == undefined ? '' : this.props.navigation.state.params.json.name,
      email:this.props.navigation.state.params == undefined ? '' : this.props.navigation.state.params.json.email,
      phoneNum:'',
      password:this.props.navigation.state.params == undefined ? '' : 'abc123',
      loginType: this.props.navigation.state.params == undefined ? '' : 'facebook',
      fbId: this.props.navigation.state.params == undefined ? '' : this.props.navigation.state.params
    }
  }

  customerSignUp(){
    let context = this;
    let { dispatch } = this.props.navigation;
    let { fullName, email, phoneNum, password } = this.state;
    let { navigate } = this.props.navigation;
    //let { userType } = this.props.navigation.state.params;
    let { enterMobile, enterValidMobile, enterFullName } = Constants.i18n.signup;
    let { enterEmail, enterPassword, enterValidEmail, enterValidPassword } = Constants.i18n.common;
    
    if (_.isEmpty(fullName.trim())) {
      console.log('hello')
      alert(enterFullName)
      return;
    }

    if(_.isEmpty(email.trim())) {
      alert(enterEmail);
      return;
    }

    if(!Regex.validateEmail(email.trim())) {
      alert(enterValidEmail);
      return;
    }
    if(_.isEmpty(phoneNum.trim())) {
      alert(enterMobile);
      return;
    }
    if(!Regex.validateMobile(phoneNum.trim())) {
      alert(enterValidMobile);
      return;
    }
    if(_.isEmpty(password)) {
      alert(enterPassword);
      return;
    }
    if(!Regex.validatePassword(password)){
      alert(enterValidPassword);
      return;
    }
    this.props.UserActions.consumerSignup({...this.state});
  }

  _handleScrollView(ref) {
    //alert('1');
    let context = this;
    context.setTimeout(() => {
      let scrollResponder = context.refs.mainScrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ref,
        (Constants.BaseStyle.DEVICE_HEIGHT/100) * 35, //additionalOffset
        true
      );
    }, 100);
  }

  _resetScrollView(ref) {
    //alert('2');
    let context = this;
    context.setTimeout(() => {
      let scrollResponder = context.refs.mainScrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ref,
        0, //(Screen.height/100) * 50, //additionalOffset
        true
      );
    }, 100);
  }

  render() {
    // let { dispatch } = this.props.navigation;
    // dispatch(ToastActionsCreators.displayInfo('hello'));
    console.log('here are props in signup ********* ',this.props.navigation.state.params)
    return (
      <View style={styles.container}>
        <BackIcon navigation={this.props.navigation}/>
        <Background />
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}  keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always' ref='mainScrollView'>
          <View style={styles.inputView}>
            {this.props.navigation.state.params != undefined ?
              <FormTextInput 
                imageSource={Constants.Images.user.username}
                placeHolderText={Constants.i18n.common.fullName}
                value={this.state.fullName}
                onChangeText={(fullName)=>this.setState({fullName})}
                returnKey='next'
              /> :
              <FormTextInput 
                imageSource={Constants.Images.user.username}
                placeHolderText={Constants.i18n.common.fullName}
                onChangeText={(fullName)=>this.setState({fullName})}
                returnKey='next'
              />
            }
            {this.props.navigation.state.params != undefined ?
              <FormTextInput 
                imageSource={Constants.Images.user.email}
                placeHolderText={Constants.i18n.common.email}
                value={this.state.email}
                onChangeText={(email)=>this.setState({email})}
                keyboard='email-address'
                returnKey='next'
              /> :
              <FormTextInput 
                imageSource={Constants.Images.user.email}
                placeHolderText={Constants.i18n.common.email}
                onChangeText={(email)=>this.setState({email})}
                keyboard='email-address'
                returnKey='next'
              />
            }
            <FormTextInput 
              imageSource={Constants.Images.user.phoneNum}
              placeHolderText={Constants.i18n.signup.phoneNum}
              onChangeText={(phoneNum)=>this.setState({phoneNum})}
              keyboard={'phone-pad'}
              returnKey='next'
            />
            {this.props.navigation.state.params == undefined && 
            <FormTextInput
              ref={'password'}
              onFocus={()=>{this._handleScrollView(ReactNative.findNodeHandle(this.refs.password));}}
              onBlur={()=>{this._resetScrollView(ReactNative.findNodeHandle(this.refs.password));}}
              imageSource={Constants.Images.user.password}
              placeHolderText={Constants.i18n.password.password}
              onChangeText={(password)=>this.setState({password})}
              secureText={true}

            />}
            <FormSubmitButton
              _Press={()=>this.customerSignUp()}
              text={Constants.i18n.common.signup}
              style={styles.button}
            />
            
            <View style={styles.alreadyAccountView}>
              <Text style={styles.alreadyAccountText}>{Constants.i18n.signup.accountAlready}<Text onPress={()=>this.props.navigation.goBack()} style={styles.signupText}> {Constants.i18n.common.signin}</Text></Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1A1F19',
  },
  inputView:{
    flex:1,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    alignItems:'center'
  },
  orText:{
    color: Constants.Colors.White,
    fontWeight:'600',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2
  },
  socialIcons:{
    flexDirection:'row',
    justifyContent:'center'
  },
  fbImg:{
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 12,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH/100 * 2,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2
  },
  alreadyAccountText:{
    color: Constants.Colors.White,
    fontSize: 18
  },
  alreadyAccountView:{
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
  },
  signupText:{
    color: Constants.Colors.White,
    fontSize: 18,
    fontWeight:'bold'
  }
});

ReactMixin(Signup.prototype, TimerMixin);

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Signup);
