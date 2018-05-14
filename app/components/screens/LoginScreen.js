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

const userIcon = (
    <View style={{top: 15}}>
      <Icon name="ios-person" size={30} color="#ffffff" />
    </View>
)

const passIcon = (
    <View style={{top: 15}}>
      <Icon name="ios-lock" size={30} color="#ffffff" />
    </View>
)

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
    try {
      let response = await fetch('http://tokosibuk.com/v1/user_login.php',{
			method:'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
        "username":"admin",
        "password":"24b0712e91489671013c3bc67d4ec8",
        "phone_imei": "38"
			})

		})
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
      } else {
        if (responseJson == "sama" || responseJson == "update") {
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
    return (
        <LinearGradient colors={['#c661e8', '#f477cb', '#f28465']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            OTTO APP
          </Text>
          <View style={styles.textInputContainer}>
            {userIcon}
            <TextInput
              underlineColorAndroid = "transparent"
              placeholder="Username"
              placeholderTextColor="#ffffff"
              onChangeText={this.onChangeUsername.bind(this)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textInputContainer}>
            {passIcon}
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
        </LinearGradient>
    );
  }
}
