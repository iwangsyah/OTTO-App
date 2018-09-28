import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class DaftarSukses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nama: null,
      telp: null,
      bank: null,
      no_rek: null,
      nama_rek: null,
      nominal: null,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('dataKontak').then((dataKontak)=>{
      let kontak = JSON.parse(dataKontak)
      this.setState({ nama: kontak.nama, telp: kontak.no_tlp, bank: kontak.bank, no_rek: kontak.no_rek, nama_rek: kontak.nama_rek, nominal: kontak.nominal })
    })
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
    let { nama, telp, bank, no_rek, nama_rek, nominal } = this.state
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
          <Text style={styles.text1}>{bank} {no_rek}</Text>
          <Text style={styles.text1}>a/n {nama_rek}</Text>
          <Text style={styles.text1}>Nominal: Rp {nominal},-</Text>
          <View>
            <Text>Untuk konfirmasi transfer silahkan kirim bukti transfer, username, dan email ke nomor WA ini ({telp}) </Text>
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
