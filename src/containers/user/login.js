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
import { LoginManager,AccessToken } from 'react-native-fbsdk';
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
import InstagramLogin from 'react-native-instagram-login'

class Login extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      token:'',
      loginType:''
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

  _fbAuth() {
    let context = this;
    context.setState({loginType:'facebook'});
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result) {
      if (result.isCancelled) {
        console.log("Login Cancelled");
      } else {
        //console.log('testttt',result)
        AccessToken.getCurrentAccessToken().then((data) => {
        console.log('props ********* user ******* ',context.props)
          fetch('https://graph.facebook.com/v2.11/me?fields=email,name&access_token=' + data.accessToken.toString())
          .then((response) => response.json())
          .then((json) => {
            console.log('json is here *********** ',json)
            let fbObject = {
              json: json,
              loginType: context.state.loginType
            }
            context.props.UserActions.signupFbAPI(fbObject);
            // Some user object has been set up somewhere, build that user here
            // user.name = json.name
            // user.id = json.id
            // user.user_friends = json.friends
            // user.email = json.email
            // user.username = json.name
            // user.loading = false
            // user.loggedIn = true
            // user.avatar = setAvatar(json.id)
          })
          .catch(() => {
            
          })

        })
        
        console.log("Login Success permission granted:" + result.grantedPermissions);
      }
    }, function(error) {
       console.log("some error occurred!!");
    })
  }

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
              <TouchableOpacity onPress={()=>this._fbAuth()}>
              
                <Image source={Constants.Images.user.facebook} style={styles.fbImg}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.refs.instagramLogin.show()}>
                <Image source={Constants.Images.user.instagram} style={styles.fbImg}/>
              </TouchableOpacity>
            </View>
            <View style={styles.noAccountView}>
              <Text style={styles.noAccountText}>{Constants.i18n.signin.noAccount}<Text onPress={()=>{navigate('Signup')}} style={styles.signupText}> {Constants.i18n.common.signup}</Text></Text>
            </View>
          </View>
        </ScrollView>
        <InstagramLogin
          ref='instagramLogin'
          clientId='264970ba5c844b949b65c66bc6bc6f97'
          scopes={['public_content', 'follower_list']}
          onLoginSuccess={(token) => this.instaLogin(token)}
        />
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
    height: 40,
    width: 40,
    borderRadius: 20,
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
