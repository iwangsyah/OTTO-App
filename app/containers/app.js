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
import DetailScreen from '../components/screens/DetailScreen'
import KontakScreen from '../components/screens/KontakScreen'
import DeviceInfo from '../components/screens/DeviceInfo'
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
                   initial
                   component={Home}
                   title='Home'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='detail'
                   component={DetailScreen}
                   title='DetailScreen'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='kontak'
                   component={KontakScreen}
                   title='KontakScreen'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='deviceInfo'
                   component={DeviceInfo}
                   title='DeviceInfo'
                   panHandlers={null}
                   hideNavBar={true} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
