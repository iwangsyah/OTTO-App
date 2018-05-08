import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

  renderHeader() {
    let { search } = this.state
    let { item } = this.props

    return (
      <View style={styles.containerHeader}>
        <Text style={styles.text3}> {item.plat} </Text>
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
              <Text style={styles.text2}>{item.asset}</Text>
              <Text style={styles.text1}>WARNA :</Text>
              <Text style={styles.text2}>{item.color}</Text>
              <Text style={styles.text1}>HARGA :</Text>
              <Text style={styles.text2}>Rp {item.amount},-</Text>
              <Text style={styles.text1}>STATUS :</Text>
              <Text style={styles.text2}>{item.status}</Text>
        </View>
        <TouchableOpacity onPress={this.back.bind(this)} style={{    marginTop:30,
            padding: 10,
            backgroundColor:'#c661e8',
            width: '80%',
            justifyContent:'center',
            alignSelf:'center',
            alignItems: 'center',
            borderRadius: 20,
            bottom:20}}>
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
