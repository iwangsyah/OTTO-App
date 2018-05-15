import React, { Component } from 'react';
import {
  View,
  Text,
  Geolocation,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info';




export default class Bantuan extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }


  back() {
    Actions.pop()
  }

  render() {

    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{marginBottom: 30, fontSize:25}}>DEVICE INFO</Text>
        <View style={{alignItems: 'flex-start'}}>
          <Text>Device Name : {DeviceInfo.getDeviceName()}</Text>
          <Text>Serial Number : {DeviceInfo.getSerialNumber()}</Text>
          <Text>Manufacture : {DeviceInfo.getManufacturer()}</Text>
          <Text>Brand : {DeviceInfo.getBrand()}</Text>
          <Text>Model : {DeviceInfo.getModel()}</Text>
          <Text>OS : {DeviceInfo.getSystemName()}</Text>
          <Text>TimeZone : {DeviceInfo.getTimezone()}</Text>
        </View>
        <TouchableOpacity onPress={this.back} style={{marginTop: 50}}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

}
