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

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    setTimeout(() => {
    AsyncStorage.getItem('logged').then((loginStatus)=>{
      let log = JSON.parse(loginStatus)
        if (log == "LoggedIn") {
          Actions.home()
        } else  {
          Actions.login()
        }
      },1500)
    })
  }

  render() {
    return (
        <LinearGradient colors={['#c661e8', '#f477cb', '#f28465']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            OTTO APP
          </Text>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 45,
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
  }
})
