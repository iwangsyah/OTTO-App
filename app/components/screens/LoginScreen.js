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
import styles from '../../styles/loginScreen'

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

export default class LoginScreen extends Component<Props> {
  login() {
    Actions.home()
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
