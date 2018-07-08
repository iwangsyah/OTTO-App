import React, { Component } from 'react';
import {
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';
import Communications from 'react-native-communications'


export default class KontakScreen extends Component {

  back() {
    Actions.pop()
  }

  renderHeader() {
    return (
      <View style={styles.containerHeader}>
        <Text style={styles.text3}> Kontak </Text>
      </View>
    )
  }

  render() {
    let { item } = this.props
    return(
      <View>
        <View style={{backgroundColor:'#ffffff', height:'100%', flexDirection:'column', justifyContent:'space-between'}}>
        {this.renderHeader()}
          <View style={{margin:10}}>
                <Text style={styles.text1}>Bpk. Wahyu</Text>
                <Text style={styles.text2}>0819 0805 7587</Text>
                <TouchableOpacity onPress={() => Communications.phonecall('081908057587', true)}
                style={{
                  marginTop:30,
                  padding:10,
                  backgroundColor:'green',
                  width: 150,
                  justifyContent:'center',
                  alignSelf:'center',
                  alignItems: 'center',
                  borderRadius: 20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Icon name="ios-call-outline" size={40} color="#ffffff" style={{marginRight:10}}/>
                      <Text style={styles.text4}>Panggil</Text>
                    </View>
                </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => Linking.canOpenURL('whatsapp://app')}>
            <Text>WA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.back.bind(this)}
            style={{
              marginTop:30,
              padding: 10,
              backgroundColor:'#c661e8',
              width: '80%',
              justifyContent:'center',
              alignSelf:'center',
              alignItems: 'center',
              borderRadius: 20,
              bottom:70}}>
              <Text style={styles.text4}>Kembali Ke Login</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf:'center',
    color:'#000000'
  },
  text2: {
    fontSize: 30,
    marginTop: 10,
    color:'blue',
    fontWeight:'bold',
    alignSelf:'center'
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
