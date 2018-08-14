import React, { Component } from 'react';
import {
  Platform,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
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

export default class DaftarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      passwordConfirm: null,
      email: null,
      phone: null,
      status: null,
      buttonPress: false,
      press: false
    }
    this.daftarValidation = this.daftarValidation.bind(this)
    this._onDaftar = this._onDaftar.bind(this)
  }

  componentDidMount() {
    this.setState({imei: DeviceInfo.getSerialNumber()})
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

  handlePress() {
    if (this.state.press) {
      return console.log('press denied');
    } else {
      return this.daftarValidation()
    }
  }

  handlePressBack() {
    if (this.state.press) {
      return console.log('press denied');
    } else {
      return Actions.pop()
    }
  }

  daftarValidation() {
    let { username, password, passwordConfirm, email, phone } = this.state
    if (password !== passwordConfirm) {
      this.setState({status: "not match", passwordConfirm: null})
    } else if (username && password && passwordConfirm && email && phone) {
      this.setState({status: "sukses"})
      this.daftar()
    } else {
      this.setState({status: "not fill"})
    }
    setTimeout(() => {
      this.setState({status: null})
    },2500)
  }

  async daftar() {
    this.setState({press: true})
    let { username, password, email, phone } = this.state
    let conn = await this.checkConnection()
    let passEncrypt = null
    if (password) {
      passEncrypt = md5(password)
    }
    if (conn) {
      this._onDaftar(username, passEncrypt, email, phone, password)
    } else {
      this.setState({press: false})
      alert('Tidak bisa terhubung ke server.\nPeriksa koneksi internet anda!')
    }
  }

  async _onDaftar(username, password, email, phone, passDecrypt) {
    try {
      let response = await fetch('http://tokosibuk.com/v1/user_registration.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
        "username":username,
        "password":password,
        "email":email,
        "phone":phone,
        "passDecrypt":passDecrypt
			})

		})
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
        alert('Terjadi kesalahan koneksi ke server')
      } else {
        this.setState({press: false})
        if (responseJson == "berhasil") {
          Actions.daftarSukses({username:username, password:passDecrypt, email:email, phone:phone})
        } else {
          alert("Gagal Mendaftar")
        }
        this.setState({ buttonPress: false })
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

  onChangePasswordConfirm(text) {
    this.setState({ passwordConfirm: text })
  }

  onChangeEmail(text) {
    this.setState({ email: text })
  }

  onChangePhone(text) {
    this.setState({ phone: text })
  }

  gotoKontak() {
    Actions.daftar()
  }

  render() {
    let { status, buttonPress, press } = this.state
    let warning = null
    let button = null
    if (status) {
      if (status == "not match") {
        warning = (
          <View style={{backgroundColor:'red', padding:10, width:'100%', marginTop:10}}>
            <Text style={{fontWeight:'bold', alignSelf:'center'}}>Password tidak sama</Text>
          </View>
        )
      } else if (status == "not fill") {
        warning = (
          <View style={{backgroundColor:'red', padding:10, width:'100%', marginTop:10}}>
            <Text style={{fontWeight:'bold', alignSelf:'center'}}>Ada form yang belum diisi</Text>
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
        <LinearGradient colors={['#c661e8', '#f477cb', '#f28465']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            DAFTAR
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
          <View style={styles.textInputContainer}>
            <View style={{top: 15}}>
              <Icon name="ios-lock" size={30} color="#ffffff" />
            </View>
            <TextInput
              underlineColorAndroid = "transparent"
              placeholder="Ulangi Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={this.onChangePasswordConfirm.bind(this)}
              style={styles.textInput}
              value={this.state.passwordConfirm}
            />
          </View>
          <View style={styles.textInputContainer}>
            <View style={{top: 15}}>
              <Icon name="ios-mail" size={30} color="#ffffff" />
            </View>
            <TextInput
              underlineColorAndroid = "transparent"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.onChangeEmail.bind(this)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            <View style={{top: 15}}>
              <Icon name="ios-call" size={30} color="#ffffff" />
            </View>
            <TextInput
              underlineColorAndroid = "transparent"
              placeholder="No. Handphone"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              onChangeText={this.onChangePhone.bind(this)}
              style={styles.textInput}
            />
          </View>
          {icon}
          <TouchableOpacity onPress={this.handlePress.bind(this)} style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Daftar</Text>
          </TouchableOpacity>
          {warning}
          <TouchableOpacity onPress={this.handlePressBack.bind(this)} style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Kembali</Text>
          </TouchableOpacity>
        </LinearGradient>
    );
  }
}
