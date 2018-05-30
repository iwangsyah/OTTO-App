import React, { Component } from 'react';
import {
  Platform,
  AsyncStorage,
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

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      imei: null,
      status: null,
    }
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    this.setState({imei: DeviceInfo.getSerialNumber()})
  }

  login() {
    let { username, password, imei } = this.state
    if (password) {
      password = md5(password)
    }
    this.checkLogin(username, password, imei)
  }

  async checkLogin(username, password, imei) {
    try {
      let response = await fetch('http://tokosibuk.com/v1/user_login.php',{
			method:'post',
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
      } else {
        console.log(responseJson);
        if (responseJson == "sukses") {
          AsyncStorage.setItem('logged', JSON.stringify("LoggedIn"))
          Actions.home()
        }
        this.setState({status: responseJson})
        if (responseJson != 'sukses') {
          setTimeout(() => {
            this.setState({status: null})
          },2000)
        }
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

  render() {
    let { status } = this.state
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
      }
    }

    return (
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
          <TouchableOpacity onPress={this.login} style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Log In</Text>
          </TouchableOpacity>
          {warning}
        </LinearGradient>
    );
  }
}
