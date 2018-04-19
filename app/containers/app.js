import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  NetInfo
} from 'react-native'

import { Router, Scene, Stack } from 'react-native-router-flux'
import { connect, Provider } from 'react-redux'
import LoginScreen from '../components/screens/LoginScreen'
import Home from '../components/screens/Home'
import store from '../store'


const RouterWithRedux = connect()(Router)

export default class DemoApp extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key='login'
                   component={LoginScreen}
                   title='LoginScreen'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='home'
                   component={Home}
                   title='Home'
                   panHandlers={null}
                   hideNavBar={true} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
