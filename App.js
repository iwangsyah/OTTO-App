/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

export default class App extends Component<Props> {
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
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.buttonLogin}>
              <Text style={styles.textLogin}>Log In</Text>
          </TouchableOpacity>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 38,
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 1.5,
    borderColor: '#ffffff',
    marginTop: 10
  },
  textInput: {
    top: 10,
    marginLeft: 20,
    width: '80%'
  },
  buttonLogin: {
    marginTop:30,
    padding: 10,
    backgroundColor:'#ffffff',
    width: '100%',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 20
  },
  textLogin: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#841584'
  }
});
