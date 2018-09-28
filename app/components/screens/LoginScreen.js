import React, { Component } from 'react';
import {
  Platform,
  AsyncStorage,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  Button,
  Text,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info';
import styles from '../../styles/loginScreen'
const md5 = require('js-md5');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      imei: null,
      status: null,
      press: false
    }
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    this.setState({imei: DeviceInfo.getSerialNumber()})
    this.getKontak()
  }

  async checkConnection() {
    let status = null
    try {
      const res = await fetch('http://tokosibuk.com/');
      if (res.status === 200) {
        status = true;
      }
    } catch (e) {
      status = false;
    }
    return status
  }

  async login() {
    Keyboard.dismiss
    this.setState({press: true})
    let { username, password, imei } = this.state
    let conn = await this.checkConnection()
    if (password) {
      password = md5(password)
    }
    if (conn) {
      this.checkLogin(username, password, imei)
    } else {
      this.setState({press: false})
      alert('Tidak bisa terhubung ke server.\nPeriksa koneksi internet anda!')
    }
  }

  async checkLogin(username, password, imei) {
    try {
      let response = await fetch('http://tokosibuk.com/v1/user_login.php',{
			method:'POST',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
        "username":username,
        "password":password,
        "phone_imei":imei
			})

		})
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
        alert('Terjadi kesalahan koneksi ke server')
      } else {
        if (responseJson.status) {
          if (responseJson.status == "Aktif") {
            AsyncStorage.setItem('logged', JSON.stringify("LoggedIn"))
            console.log(responseJson.id);
            AsyncStorage.setItem('userLogged', JSON.stringify(responseJson.id))
            Actions.home()
          }
          this.setState({status: responseJson.status})
        } else {
          this.setState({status: responseJson})
        }
        this.setState({press: false})
        if (responseJson) {
          setTimeout(() => {
            this.setState({status: null})
          },2500)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getKontak() {
    try {
      let response = await fetch('http://tokosibuk.com/v1/kontak.php', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
      } else {
        let kontak = responseJson
        AsyncStorage.setItem('dataKontak', JSON.stringify(kontak))
      }
    } catch (error) {
      console.log(error);
    }
  }


  onChangeUsername(text) {
    this.setState({ username: text})
  }

  onChangePassword(text) {
    this.setState({ password: text })
  }

  gotoDaftar() {
    Actions.daftar()
  }

  gotoKontak() {
    Actions.kontak({ text: 'Login'})
  }

  render() {
    let { status, press } = this.state
    let warning = null
    if (status) {
      if (status == "salah") {
        warning = (
          <View style={{backgroundColor:'red', padding:10, width:'100%', marginTop:10}}>
            <Text style={{fontWeight:'bold', alignSelf:'center'}}>Username atau Password Salah</Text>
          </View>
        )
      } else if (status == "beda") {
        warning = (
          <View style={{backgroundColor:'red', padding:10, width:'100%', marginTop:10}}>
            <Text style={{fontWeight:'bold', alignSelf:'center'}}>Akun sudah digunakan di HP lain</Text>
          </View>
        )
      } else if (status == "Tidak Aktif") {
        warning = (
          <View style={{backgroundColor:'red', padding:10, width:'100%', marginTop:10}}>
            <Text style={{fontWeight:'bold', alignSelf:'center'}}>Akun anda tidak aktif</Text>
          </View>
        )
      }
    }
    let icon = null
    if (press) {
      icon = (
        <ActivityIndicator
          animating={true}
          style={{height: 80}}
          size="large" />
      )
    } else {
      icon = null
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient colors={['#c661e8', '#f477cb', '#f28465']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            OTTO APP
          </Text>
          <View style={styles.textInputContainer}>
            <View style={{top: 15}}>
              <Icon name="ios-person" size={30} color="#ffffff" />
            </View>
            <TextInput
              underlineColorAndroid = "transparent"
              placeholder="Username"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.onChangeUsername.bind(this)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            <View style={{top: 15}}>
              <Icon name="ios-lock" size={30} color="#ffffff" />
            </View>
            <TextInput
              underlineColorAndroid = "transparent"
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={this.onChangePassword.bind(this)}
              style={styles.textInput}
            />
          </View>
          {icon}
          <TouchableOpacity onPress={this.login} style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Log In</Text>
          </TouchableOpacity>
          {warning}
          <View style={{flexDirection:'row', top:10}}>
            <Text style={{fontWeight:'bold', color:'#ffffff'}}> Belum punya akun ? </Text>
            <TouchableOpacity onPress={this.gotoDaftar}>
              <Text style={{fontWeight:'bold', color:'#841584'}}> Daftar</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', top:10}}>
            <Text style={{fontWeight:'bold', color:'#ffffff'}}> Atau hubungi kontak </Text>
            <TouchableOpacity onPress={this.gotoKontak}>
              <Text style={{fontWeight:'bold', color:'#841584'}}> Disini</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
  }
}
