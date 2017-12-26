
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  FlatList
} from 'react-native';
import Constants from '../../constants';
import StarRating from '../common/StarRating';
import Connection  from "../../config/Connection";
import _ from 'lodash';
export default class HomeScreenListing extends Component {
  constructor(props){
    super(props);
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress(item){
    //console.log('is logged in ******** ',this.props)
    if(this.props.isLoggedIn) {
      this.props.navigation.navigate('ViewStylist', {itemDetails: this.props.item});
    }else{
      Alert.alert(
        "Sign in Required",
        "Please sign in to book stylist",
        [
          {text: 'Cancel',  onPress: () => console.log('Cancel Pressed')},
          {text: 'Sign in', onPress: () =>{ this.props.navigation.navigate("Login", { 
            userType: "customer" ,
            initialIndex:1
          })}},
        ],
      { cancelable: false }
      );
    }
  }

  renderImage(item) {
    console.log('item is here ********* ',item.index)
    let totalItems = item.index;
    return(
      <Image 
        source={{ uri: Connection.getMedia()+item.item.image_name }}
        style={styles.imageStyle} 
        //resizeMode='cover'
      />
    )
  }

  render(){
    let data = this.props.item;
    let imageThumbnails = data.thumbnail;
    //if (imageThumbnails.length > 4) {}
    console.log('data ******* ',imageThumbnails.length)
    return(
      <TouchableOpacity style={styles.listContainer}
        onPress={()=>{
                //this.props.onCancel();
                this.onItemPress(this.props.item);
              }}
      >
        <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 3,marginVertical: Constants.BaseStyle.DEVICE_HEIGHT/100 * 2}}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Image source={{uri: Connection.getMedia()+data.picture}} style={styles.stylistImage} />
            </View>
            <View style={{flex:2}}>
              <Text style={styles.username}>{data.full_name}</Text>
              <Text style={styles.designation}>Stylist at Redbox Barber</Text>
            </View>
            <View style={{flex:2}}>
              <View style={styles.bookNow}>
                <Text>BOOK NOW</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection:'row',marginVertical:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1.5}}>
            <View style={{flex:1}}>
              <Text style={styles.boldText}>Rating</Text>
              <StarRating
                editable={false}
                rating={4}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.boldText}>Start From</Text>
              <Text style={styles.desc}>${data.starting_price}</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.boldText}>Distance</Text>
              <Text style={styles.desc}>{Math.round(data.distance * 100) / 100}{data.units}</Text>
            </View>
          </View>
          {imageThumbnails.length > 3 ?
            <View style={{flexDirection:'row'}}>
              <FlatList
                horizontal={true}
                data={data.thumbnail}
                renderItem={this.renderImage}
              />
              <View style={{alignSelf:'flex-end',backgroundColor:'rgba(0,0,0,.1)',justifyContent:'center',alignItems:'center',height: Constants.BaseStyle.DEVICE_WIDTH*20/100,width: Constants.BaseStyle.DEVICE_WIDTH*20/100}}>
                <Text style={{color:'#fff'}}>{imageThumbnails.length - 4} more</Text>
              </View>
            </View> :
            <FlatList
              horizontal={true}
              data={data.thumbnail}
              renderItem={this.renderImage}
            />
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor:'#292E27',
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH/100 * 6,
    marginVertical: Constants.BaseStyle.DEVICE_HEIGHT/100 * 1.5
  },
  paginationView:{
    height:50,
    backgroundColor:Constants.Colors.Transparent,
    justifyContent:"center"
  },
  stylistImage:{
    height: 50,
    width: 50,
    borderRadius:25
  },
  username:{
    fontSize:Constants.BaseStyle.FONT_SIZE_TITLE,
    fontWeight: Constants.BaseStyle.BOLD,
    color:'rgb(252, 228, 149)'
  },
  designation: {
    color:Constants.Colors.White
  },
  bookNow: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgb(252, 228, 149)',
    padding: Constants.BaseStyle.DEVICE_HEIGHT/100 * 1.5,
    borderRadius:20
    //width:Constants.BaseStyle.DEVICE_WIDTH/100 * 25
  },
  boldText: {
    color: Constants.Colors.White,
    fontWeight: Constants.BaseStyle.BOLD,
  },
  desc:{
    color: 'rgb(252, 228, 149)',
    fontWeight: Constants.BaseStyle.BOLD,
  },
  imageContainer:{
    flexDirection:'row',
    height: Constants.BaseStyle.DEVICE_WIDTH*21/100,
    width: Constants.BaseStyle.DEVICE_WIDTH*21/100,
  },
  imageStyle: {
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH*.8/100,
    height: Constants.BaseStyle.DEVICE_WIDTH*20/100,
    width: Constants.BaseStyle.DEVICE_WIDTH*20/100,
  }
});