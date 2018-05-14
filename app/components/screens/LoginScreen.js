import React, { Component } from 'react';
import {
  Platform,
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

  login() {
    let { username, password, imei } = this.state
    if (password) {
      password = md5(password)
    }
    this.checkLogin()
  }

  async checkLogin() {
    let { username, password } = this.state
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
			})

		})
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
      } else {
        if (responseJson == "sukses") {
          Actions.home()
        }
        this.setState({status: responseJson})
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

    if (status != "sukses") {
      warning = (
        <View style={{backgroundColor:'red', padding:10, width:'100%', marginTop:10}}>
          <Text style={{fontWeight:'bold', alignSelf:'center'}}>Username atau Password Salah</Text>
        </View>
      )
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
