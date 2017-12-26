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
  ScrollView,
  TouchableOpacity,
  Slider,
  FlatList,
} from 'react-native';

import Constants from '../../constants';
import Background from '../../components/common/Background';
import Filters from '../../components/common/Filters';
import StylishList from './stylishList';
import StarRating from '../../components/common/StarRating';
import Idx from "../../utilities/Idx";
import * as locationActions from "../../redux/modules/location";
import * as userActions from "../../redux/modules/user";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Calendar from 'react-native-calendar';
import ReactMixin from "react-mixin";
import TimerMixin from "react-timer-mixin";
import _ from 'lodash';
import moment from "moment";
import CalendarStyle from './CalendarStyle';
import Modal from 'react-native-modal';
import Button from '../../components/common/SubmitButton';
class Home extends Component<{}> {
  constructor(props){
    super(props);
    this.currentDate = new Date();
    this.state = {
      selected: 'distance',
      isChecked: 'fifty',
      skip:0,
      limit:10,
      total:0,
      isRefreshing: false,
      isFooterVisible : false,
      position : {
        lat : 0,
        long : 0,
        address : ""
      },
      isLocationEnabled : true,
      stylistBook: false,
      availability    : false,
      dateIndex       : 0 , 
      isPastDate      : false,
      starts_on       : moment(new Date()).seconds(0).minute(0).hours(0).toISOString(),
      ends_on         : moment(new Date()).seconds(59).minute(59).hours(23).toISOString(),
      local           : moment(new Date()).seconds(0).minute(0).hours(1).toISOString(),
      monthsTraversed : [moment().format('MM-YYYY')],
      isModalVisible: false
    }
    this.interval = 0;
    this.isLoggedIn = false;
    this.isEndReached = false;
    //console.log('props ******** ',this.props)
    if (Idx(this.props, _ => _.user.userDetails.token)) {
      this.isLoggedIn = true;
      this.userToken = this.props.user.userDetails.token;
      //this.userId = this.props.user.userDetails.userId;
    }
  }

  componentDidMount(){
    this.setState({isRefreshing:true});
    this.getData(true);
  }

  componentWillUnmount(){
    this.clearInterval(this.interval);
  }

  distanceFilter(){
    this.setState({selected:'distance'})
  }

  ratingFilter(){
    this.setState({selected:'rating'})
  }

  priceFilter(){
    this.setState({selected:'price'})
  }

  calenderFilter(){
    this.setState({
      selected:'calender',
      isModalVisible: true
    })
  }

  getData(isIntialLoad){
    // console.log('initial load ******** ',isIntialLoad)
    let context = this;
   //  if(isIntialLoad){
   //    context.setTimeout(()=>{
   //      if(context.props.location.currentLocation != null){
   //        console.log('inside not null ******* ')
   //        let requestObject = {
   //          // position:{
   //          //   lat : context.props.location.currentLocation.position.lat,
   //          //   long : context.props.location.currentLocation.position.lng,
   //          //   address : context.props.location.currentLocation.formattedAddress
   //          // },
   //          // role : 1,
   //          // starts_on: context.state.starts_on,
   //          // ends_on: context.state.ends_on,
   //          page:context.state.skip,
   //          count:context.state.limit
   //        }
   //        // context.setState({
   //        //   position:{
   //        //     lat : context.props.location.currentLocation.position.lat,
   //        //     long : context.props.location.currentLocation.position.lng,
   //        //     address : context.props.location.currentLocation.formattedAddress
   //        //   }
   //        // });
   //        context.props.userActions.stylistList(requestObject,function(count) {
   //          context.isEndReached = false;
   //          if(count){
   //            context.setState({
   //              total:count,
   //              isFooterVisible:false,
   //              isRefreshing:false
   //            });
   //          }else{
   //            context.setState({
   //              isFooterVisible:false,
   //              isRefreshing:false
   //            });
   //          }
   //        });
   //      }else{
   //        console.log('inside else means location null ******* ')
   //        // if(context.props.location.isError){
   //        //   context.setState({
   //        //     isFooterVisible:false,
   //        //     isRefreshing:false,
   //        //     isLocationEnabled:false
   //        //   });
   //        //   context.setTimeout(()=>{
   //        //     Alert.alert(
   //        //       "Location Permissions", 
   //        //       "We need to access your location. Please go to Settings > Privacy > Location to allow Stylist to access your location.", 
   //        //       [{
   //        //         text: "Enable",
   //        //         onPress:()=>{Permissions.openSettings()}
   //        //       },{
   //        //         text: "Cancel",
   //        //         onPress:()=>{console.log("Cancel")}
   //        //       }],
   //        //       {cancelable: false}
   //        //     );
   //        //   },700);
   //        // }else{
   //        //   context.getData(true);
   //        // }

          
   //        let requestObject = {
   //      // position:{
   //      //   lat : context.state.position.lat,
   //      //   long : context.state.position.long,
   //      //   address : context.state.position.address,
   //      // },
   //      //user_type : "stylist",
   //      page:context.state.skip,
   //      count:context.state.limit
   //    }
   //    context.props.userActions.stylistList(requestObject,function(count) {
   //      context.isEndReached = false;
   //      if(count){
   //        context.setState({
   //          total:count,
   //          isFooterVisible:false,
   //          isRefreshing:false
   //        });
   //      }else{
   //        context.setState({
   //          isFooterVisible:false,
   //          isRefreshing:false
   //        });
   //      }
   //    });     
   //      }
   //    },500);
   //  }else{
         
   // }
   let requestObject = {
        // position:{
        //   lat : context.state.position.lat,
        //   long : context.state.position.long,
        //   address : context.state.position.address,
        // },
        //user_type : "stylist",
        page:context.state.skip,
        count:context.state.limit
      }
      context.props.userActions.stylistList(requestObject,function(count) {
        context.isEndReached = false;
        if(count){
          context.setState({
            total:count,
            isFooterVisible:false,
            isRefreshing:false
          });
        }else{
          context.setState({
            isFooterVisible:false,
            isRefreshing:false
          });
        }
      });
  }

  checkUserStatus(){
    if(this.isLoggedIn){
      this.props.navigation.navigate("Home");
    }else{
      Alert.alert(
        "Sign in Required",
        "Please sign in to use this feature.",
        [
          {text: 'Cancel',  onPress: () => console.log('Cancel Pressed')},
          {text: 'Sign in', onPress: () =>{ this.props.navigation.navigate("Login", { 
            userType: "customer",
            initialIndex:1
          })}},
        ],
      { cancelable: false }
      )
    }
  }

  /**
  * onRefresh
  */

  stylistListRefresh(){
    let context = this;
      context.setState({skip:0,isRefreshing:true});
    if(context.props.location.isError){
      checkPermissions({
        dispatch : context.props.navigation.dispatch
      });
      context.setTimeout(()=>context.getData(false),1000);
    }else{
      context.setTimeout(()=>context.getData(false),1000);
    }
  }

  /**
  * onEndReached
  */

  stylistListonReachedEnd(){
    let context = this;
    if(!context.isEndReached  && context.state.skip<context.state.total){
      context.isEndReached = true;
      context.setState({
        skip:context.state.skip+10,
        isFooterVisible : true
      });
      context.setTimeout(()=>context.getData(false),1000);
    }
  }

  /**
  * Get Data Based on Selected Date.
  */
  requestOnDate(date) {
    let context = this;
    console.log('hello date ******* ',date)
    // let starts_on = moment(date).seconds(0).minute(0).hours(0).toISOString(), 
    //   ends_on = moment(date).seconds(59).minute(59).hours(23).toISOString(),
    //   currentDate = moment(new Date()).seconds(0).minute(0).hours(0).toISOString();

    // if(moment(starts_on).format("X")<moment(currentDate).format("X")) {
    //   context.setState({
    //     isPastDate  : true,
    //     starts_on   : starts_on,
    //     ends_on     : ends_on
    //   });
    // } else {
    //   let leaves = [...this.props.availability.leaves];
    //   let index = _.findIndex(leaves, function(o) {
    //     let date2 = moment(starts_on).add(1,'h');
    //     let date1 = moment(o.starts_on).format("X");
    //     date2 = moment(date2).format("X");
    //     return date1 == date2;
    //   });
    //   let local = moment(starts_on).add(1,'h');
    //   context.setState({
    //     isPastDate    : false,
    //     starts_on     : starts_on,
    //     ends_on       : ends_on,
    //     availability  : index < 0 ? true : false,
    //     local         : local
    //   });
    // }
  }

  /**
  * Get Next/Prev Month Data on Calendar Change.
  */
  calendarData(data, place, setDate) {
    let context = this;
    if(setDate) {
      context.currentDate = data._d;
    }
    let gotDate = moment(data._d).format('MM-YYYY'),
      currentDate = moment().format('MM-YYYY');
    let monthsTraversed = context.state.monthsTraversed;
    monthsTraversed = [...monthsTraversed,...[gotDate]];
    context.setState({monthsTraversed,numberOfBookings:0});
    if(monthsTraversed.findIndex(each => each == gotDate) != -1){
      // api call
    }
  }

  _hideModal(){
    this.setState({ isModalVisible: false }) 
  }

  render() {
    let { months, days} = Constants.i18n.calendar;
    return (
      <View style={styles.container}>
        <Image source={Constants.Images.home.userProfileImg} style={styles.userImg} resizeMode='stretch' />
        <View style={styles.filterContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>this.distanceFilter()}>
              <Image source={this.state.selected == 'distance' ? Constants.Images.home.distanceFilter : Constants.Images.home.distance } style={styles.filterStyle} resizeMode='stretch'/>
            </TouchableOpacity>
            {this.state.selected == 'distance' ? <Text style={{color:'rgb(252, 228, 149)'}}>Distance</Text> : <Text style={{color:'#494A48'}}>Distance</Text>}
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>this.ratingFilter()}>
              <Image source={this.state.selected == 'rating' ? Constants.Images.home.ratingFilter : Constants.Images.home.rating} style={styles.filterStyle} resizeMode='stretch'/>
            </TouchableOpacity>
            {this.state.selected == 'rating' ? <Text style={{color:'rgb(252, 228, 149)'}}>Rating</Text> : <Text style={{color:'#494A48'}}>Rating</Text>}
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>this.priceFilter()}>
              <Image source={this.state.selected == 'price' ? Constants.Images.home.priceFilter : Constants.Images.home.price} style={styles.filterStyle} resizeMode='stretch'/>
            </TouchableOpacity>
            {this.state.selected == 'price' ? <Text style={{color:'rgb(252, 228, 149)'}}>Price</Text> : <Text style={{color:'#494A48'}}>Price</Text>}
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={()=>this.calenderFilter()}>
              <Image source={this.state.selected == 'calender' ? Constants.Images.home.calenderFilter : Constants.Images.home.calender} style={styles.filterStyle} resizeMode='stretch'/>
            </TouchableOpacity>
            {this.state.selected == 'calender' ? <Text style={{color:'rgb(252, 228, 149)'}}>Calendar</Text> : <Text style={{color:'#494A48'}}>Calendar</Text>}
          </View>
        </View>
        {this.state.selected == 'distance' && <Slider style={styles.slider} thumbTintColor='rgb(252, 228, 149)' minimumValue={10} step={1} maximumValue={100} thumbTintColor='rgb(252, 228, 149)' maximumTrackTintColor='#494A48' minimumTrackTintColor='rgb(252, 228, 149)' />}
        {this.state.selected == 'rating' && <Slider style={styles.slider} thumbTintColor='rgb(252, 228, 149)' minimumValue={1} step={0.5} maximumValue={5} thumbTintColor='rgb(252, 228, 149)' maximumTrackTintColor='#494A48' minimumTrackTintColor='rgb(252, 228, 149)' />}
        {this.state.selected == 'price' && 
          <View style={{flexDirection:'row',marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*3,marginVertical:Constants.BaseStyle.DEVICE_HEIGHT/100*3}}>
            <TouchableOpacity onPress={()=>this.setState({isChecked:'fifty'})} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={this.state.isChecked == 'fifty' ? Constants.Images.home.radioCheck : Constants.Images.home.radioUncheck} style={{height:20,width:20}} resizeMode='stretch'/>
              {this.state.isChecked == 'fifty' ? <Text style={{color:'rgb(252, 228, 149)'}}>$50 - $100</Text> : <Text style={{color:'#494A48'}}> $50 - $100</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({isChecked:'hundred'})} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={this.state.isChecked == 'hundred' ? Constants.Images.home.radioCheck : Constants.Images.home.radioUncheck} style={{height:20,width:20}} resizeMode='stretch'/>
              {this.state.isChecked == 'hundred' ? <Text style={{color:'rgb(252, 228, 149)'}}>$100 - $150</Text> : <Text style={{color:'#494A48'}}> $100 - $150</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({isChecked:'onefifty'})} style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <Image source={this.state.isChecked == 'onefifty' ? Constants.Images.home.radioCheck : Constants.Images.home.radioUncheck} style={{height:20,width:20}} resizeMode='stretch'/>
              {this.state.isChecked == 'onefifty' ? <Text style={{color:'rgb(252, 228, 149)'}}>$150 - $200</Text> : <Text style={{color:'#494A48'}}> $150 - $200</Text>}
            </TouchableOpacity>
          </View>
        }
        {this.state.selected == 'calender' &&
          <Modal isVisible={this.state.isModalVisible}>
            <Calendar
              ref="calendar"
              showEventIndicators
              customStyle={CalendarStyle}
              //eventDates={bookings}
              //bookingFullDates={leaves}
              scrollEnabled
              showControls
              dayHeadings={days}
              monthNames={months}
              titleFormat={'MMMMYY'}
              prevButtonText={'<'}
              nextButtonText={'>'}
              onDateSelect={(date) => this.requestOnDate(date)}
              onTouchPrev={(e) => this.calendarData(e,'prev',1)}
              onTouchNext={(e) => this.calendarData(e,'next',1)}
            />
            <Button _Press={this._hideModal.bind(this)} text='Close' />
          </Modal>
        }
        <StylishList
            {...this.props}
            isLoggedIn = {this.isLoggedIn}
            data = {this.props.user.stylistList.length!==0 ? this.props.user.stylistList :  null}
            stylistListRefresh={()=>this.stylistListRefresh()}
            stylistListonReachedEnd={()=>this.stylistListonReachedEnd()}
            isRefreshing = {this.state.isRefreshing}
            isFooterVisible = {this.state.isFooterVisible}
            //onCancel={() => this.cancelChefCal()}
            showStylist={(data) => {
              this.setState({stylistBook:true,stylistDetails:data});
            }}
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
  userImg:{
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    alignSelf: 'flex-end',
    marginRight: Constants.BaseStyle.DEVICE_WIDTH/100 * 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 *18
  },
  filterContainer:{
    backgroundColor:'#1A1F19',
    flexDirection:'row',
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
  },
  filterStyle:{
    height: Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 *18
  },
  imageContainer:{
    flex:1,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    alignItems:'center'
  },
  slider:{ 
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    alignSelf:'center',
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 80,
    //color:'rgb(252, 228, 149)'
  },
  calendar:{
    backgroundColor:'#1A1F19'
  }
});

ReactMixin(Home.prototype, TimerMixin);

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  locationActions     : bindActionCreators(locationActions, dispatch),
  userActions         : bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);