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
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';

import _ from 'lodash';
import Constants from '../../constants';
import HomeScreenListing from '../../components/home/HomeScreenListing';
import NoRecord from "../../components/common/NoRecord";

export default class StylishList extends Component {
  constructor(props){
    super(props);
    this.renderItem   = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  /**
  * Render Footer
  */
  renderFooter(){
    let context=this;
    return(
      <View style={this.props.isFooterVisible?styles.paginationView:{height:0,width:0}}>
        { this.props.isFooterVisible &&
          <ActivityIndicator
            style={{alignSelf:"center"}} 
            size={"large"} 
            color={Constants.Colors.Black}/>
        }
      </View>
    )
  }

  /**
  * Extract Item Key
  */
 // _keyExtractor = (item, index) => item._id;

  renderItem({item, index}){
    let context = this;
    //console.log('props ********* ',this.props.data)
    return(
      <HomeScreenListing 
        showStylist={this.props.showStylist}
        isLoggedIn={this.props.isLoggedIn}
        navigation={this.props.navigation}
        item={item}
        //onCancel={this.props.onCancel}
      />
    );
  }

  render(){
    //console.log('props ********* ',this.props.data)
  	return(
      <View style={[styles.container]}>
        <FlatList
          data={this.props.data}
          onRefresh={()=>this.props.stylistListRefresh()}
          refreshing={this.props.isRefreshing}
          onEndReachedThreshold={0.8}
          onEndReached={()=>this.props.stylistListonReachedEnd()}
          //keyExtractor={(item, index)=>{this._keyExtractor(item, index);console.log('item ****** ',item._id)}}
          enableEmptySections={true}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          ListEmptyComponent={()=><NoRecord />}
        />
      </View>  
  	)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F19',
  }
});

