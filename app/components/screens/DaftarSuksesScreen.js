import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class DetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  back() {
    Actions.login()
  }

  renderHeader() {
    let { search } = this.state
    let { item } = this.props

    return (
      <View style={styles.containerHeader}>
        <Text style={styles.text3}> Berhasil Mendaftar </Text>
      </View>
    )
  }

  render() {
    let { username, password, email, phone } = this.props
    return(
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={{margin:10}}>
          <View style={{marginBottom:20}}>
            <Text style={styles.text1}>Username : {username}</Text>
            <Text style={styles.text1}>Password : {password}</Text>
            <Text style={styles.text1}>Email    : {email}</Text>
            <Text style={styles.text1}>No. Hp   : {phone}</Text>
          </View>
          <View style={{marginBottom:20}}>
            <Text>Cek Inbok atau spam email {email}</Text>
          </View>
          <Text style={styles.text2}>Untuk mengaktifkan akun ini silahkan melakukan transfer ke rekening ini:</Text>
          <Text style={styles.text1}>BCA 00000000</Text>
          <Text style={styles.text1}>a/n Wahyu</Text>
          <Text style={styles.text1}>Nominal: Rp 00000,-</Text>
          <View>
            <Text>Untuk konfirmasi transfer silahkan kirim bukti transfer, username, dan email ke nomor WA ini (081908057587) </Text>
          </View>
          <TouchableOpacity onPress={this.back.bind(this)} style={{    marginTop:30,
              padding: 10,
              backgroundColor:'#c661e8',
              width: '80%',
              justifyContent:'center',
              alignSelf:'center',
              alignItems: 'center',
              borderRadius: 20,
              top:20}}>
              <Text style={styles.text4}>Kembali</Text>
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
  container: {
    backgroundColor:'#ffffff',
    height:'100%',
    flexDirection:'column',
  },
  text1: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000000'
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'red'
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
