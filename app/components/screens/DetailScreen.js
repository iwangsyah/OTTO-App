import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Share,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';

const barsIcon = (<Icon name="ios-arrow-back" size={30} color="black" />)

export default class DetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  back() {
    Actions.pop()
  }

  onShare = async (item) => {
    try {
      const result = await Share.share({
        message:
          `*NO PLAT*:\n ${item.plat}\n\n*NAMA*:\n ${item.asset}\n\n*WARNA*:\n ${item.color}\n\n*HARGA*:\n Rp ${item.amount}\n\n*STATUS*:\n ${item.status}\n\n\n\n*INFO LEBIH LANJUT*:\nhttps://play.google.com/store/apps/details?id=com.mateldatacenterapp`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  renderHeader() {
    let { search } = this.state
    let { item } = this.props

    return (
      <View style={styles.containerHeader}>
        <Text style={styles.text3}> {item.plat || item.Police_No} </Text>
      </View>
    )
  }

  render() {
    let { item } = this.props
    return(
      <View style={{backgroundColor:'#ffffff', height:'100%', flexDirection:'column', justifyContent:'space-between'}}>
        {this.renderHeader()}
        <View style={{margin:10}}>
              <Text style={styles.text1}>NAMA :</Text>
              <Text style={styles.text2}>{item.asset || item.Asset_Name}</Text>
              <Text style={styles.text1}>WARNA :</Text>
              <Text style={styles.text2}>{item.color || item.Asset_Color__Nosin}</Text>
              <Text style={styles.text1}>HARGA :</Text>
              <Text style={styles.text2}>Rp {item.amount || item.Amount},-</Text>
              <Text style={styles.text1}>STATUS :</Text>
              <Text style={styles.text2}>{item.status || item.Status}</Text>
        </View>
        <TouchableOpacity onPress={() => this.onShare(item)} style={{    marginTop:30,
            padding: 10,
            backgroundColor:'green',
            width: '80%',
            justifyContent:'center',
            alignSelf:'center',
            alignItems: 'center',
            borderRadius: 20,
            bottom:30}}>
            <Text style={styles.text4}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.back.bind(this)} style={{
            padding: 10,
            backgroundColor:'#c661e8',
            width: '80%',
            justifyContent:'center',
            alignSelf:'center',
            alignItems: 'center',
            borderRadius: 20,
            bottom:30}}>
            <Text style={styles.text4}>Kembali Ke Pencarian</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#c661e8',
    flexDirection: 'row',
    justifyContent:'center',
    height: 70,
    padding: 10,
    paddingTop: 20,
  },
  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#000000'
  },
  text2: {
    fontSize: 20,
    marginLeft: 20,
    color:'#000000',
    marginBottom:30
  },
  text3: {
    fontSize:30,
    fontWeight:'bold',
    color:'#ffffff',
    alignSelf:'center'
  },
  text4: {
    fontSize:20,
    fontWeight:'bold',
    color:'#ffffff',
  }
});

