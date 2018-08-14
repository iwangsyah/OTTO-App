import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  NetInfo
} from 'react-native'

import { Router, Scene, Stack } from 'react-native-router-flux'
import { connect, Provider } from 'react-redux'
import SplashScreen from '../components/screens/SplashScreen'
import LoginScreen from '../components/screens/LoginScreen'
import Home from '../components/screens/Home'
import DetailScreen from '../components/screens/DetailScreen'
import KontakScreen from '../components/screens/KontakScreen'
import DaftarScreen from '../components/screens/DaftarScreen'
import DaftarSuksesScreen from '../components/screens/DaftarSuksesScreen'
import DeviceInfo from '../components/screens/DeviceInfo'
import store from '../store'


const RouterWithRedux = connect()(Router)

export default class DemoApp extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key='splash'
                   component={SplashScreen}
                   title='SplashScreen'
                   panHandlers={null}
                   hideNavBar={true} />
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
            <Scene key='daftar'
                   component={DaftarScreen}
                   title='DaftarScreen'
                   panHandlers={null}
                   hideNavBar={true} />
            <Scene key='daftarSukses'
                   component={DaftarSuksesScreen}
                   title='KontakScreen'
                   panHandlers={null}
                   hideNavBar={true}/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    )
  }
}
