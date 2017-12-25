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
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
//import { LoginManager,AccessToken } from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login'
// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton,
//   AccessToken
// } = FBSDK;

import Constants from '../../constants';
import Background from '../../components/common/Background';
import BackIcon from '../../components/common/BackButton';
import FormTextInput from '../../components/common/FormTextInput';
import FormSubmitButton from '../../components/common/SubmitButton';
import _ from 'lodash';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from '../../redux/modules/user';
import Regex from '../../utilities/Regex';
//import InstagramLogin from 'react-native-instagram-login'

class Login extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      token:''
    }
  }

  signInWithoutFb(){
    let context = this;
    let { email, password } = this.state;
    let { enterEmail, enterValidEmail, enterPassword, enterValidPassword } = Constants.i18n.common;
    let { navigate, dispatch } = this.props.navigation;

    if(_.isEmpty(email.trim())) {
      alert(enterEmail);
      return;
    }
    if(!Regex.validateEmail(email.trim()) && !Regex.validateMobile(email.trim())) {
      alert(enterValidEmail);
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
    console.log(this.props)
    this.props.UserActions.loginRestAPI({...this.state});  
  }

  // _fbAuth() {
  //   LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result) {
  //     if (result.isCancelled) {
  //       console.log("Login Cancelled");
  //     } else {
  //       console.log('testttt',result)
  //       AccessToken.getCurrentAccessToken().then((data) => {
      
  //         fetch('https://graph.facebook.com/v2.11/me?fields=email,name&access_token=' + data.accessToken.toString())
  //         .then((response) => response.json())
  //         .then((json) => {
  //           this.props.UserActions.signupFB({...this.state});
  //           //console.log('sdfda12143546546',json.email)
            
  //           // Some user object has been set up somewhere, build that user here
  //           // user.name = json.name
  //           // user.id = json.id
  //           // user.user_friends = json.friends
  //           // user.email = json.email
  //           // user.username = json.name
  //           // user.loading = false
  //           // user.loggedIn = true
  //           // user.avatar = setAvatar(json.id)   
  //         })
  //         .catch(() => {
            
  //         })

  //       })
      
  //       console.log("Login Success permission granted:" + result.grantedPermissions);
  //     }
  //   }, function(error) {
  //      console.log("some error occurred!!");
  //   })
  // }

  instaLogin(token){
    console.log('token ********** ',token)
  }
  


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <BackIcon navigation={this.props.navigation}/>
        <Background />
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}  keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always' ref='mainScrollView'>
          <View style={styles.inputView}>
            <FormTextInput 
              imageSource={Constants.Images.user.email}
              placeHolderText={Constants.i18n.common.email}
              onChangeText={(email)=>this.setState({email})}
              keyboard='email-address'
              returnKey='next'
            />
            <FormTextInput 
              imageSource={Constants.Images.user.password}
              placeHolderText={Constants.i18n.password.password}
              onChangeText={(password)=>this.setState({password})}
              secureText={true}
            />
            <FormSubmitButton 
              _Press={()=>this.signInWithoutFb()}
              text={Constants.i18n.common.signin}
              style={styles.button}
            />
            <Text style={styles.orText}>{Constants.i18n.common.or}</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity>
              
                <Image source={Constants.Images.user.facebook} style={styles.fbImg} resizeMode='stretch'/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Constants.Images.user.instagram} style={styles.fbImg} resizeMode='stretch'/>
              </TouchableOpacity>
              
            </View>
            <View style={styles.noAccountView}>
              <Text style={styles.noAccountText}>{Constants.i18n.signin.noAccount}<Text onPress={()=>{navigate('Signup')}} style={styles.signupText}> {Constants.i18n.common.signup}</Text></Text>
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
  noAccountText:{
    color: Constants.Colors.White,
    fontSize: 18
  },
  noAccountView:{
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 8,
  },
  signupText:{
    color: Constants.Colors.White,
    fontSize: 18,
    fontWeight:'bold'
  }
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);
