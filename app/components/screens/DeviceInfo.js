import React, { Component } from 'react';
import {
  View,
  Text,
  Geolocation,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info';
import { showLocation } from 'react-native-map-link'




export default class Bantuan extends Component {

  constructor(props) {
    super(props)
    this.state = {
       initialPosition: 'unknown',
       lastPosition: 'unknown',
       longitude: null,
       latitude: null,
    }
    this.open = this.open.bind(this)
  }

  watchID: ?number = null;

  componentDidMount() {
    let { inspection } = this.props
    //get Location
    navigator.geolocation.getCurrentPosition(
        (position) => {
           const initialPosition = JSON.stringify(position);
           this.setState({ initialPosition: initialPosition });
        },
        (error) => console.log('error: ', error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
     );
     this.watchID = navigator.geolocation.watchPosition((position) => {
        const lastPosition = JSON.stringify(position);
        const longitude = JSON.stringify(position.coords.longitude);
        const latitude = JSON.stringify(position.coords.latitude);
        this.setState({
          lastPosition: lastPosition,
          longitude: longitude,
          latitude: latitude,
        });
     });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  open() {
    let { latitude, longitude } = this.state
    let title = latitude+', '+longitude
    console.log(title);
      if (latitude && longitude) {
        showLocation({
          latitude: latitude,
          longitude: longitude,
          title: title  // optional
          // app: 'uber'  // optionally specify specific app to use
        })
      } else {
        alert("Couldn't find coordinate")
      }
  }

  back() {
    Actions.pop()
  }

  render() {
    let { latitude, longitude } = this.state

    if (!latitude && !longitude) {
      latitude = 'unknown'
      longitude = 'unknown'
    }

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
          <View style={{flexDirection: 'row'}}>
            <Text>Location : </Text>
            <TouchableOpacity onPress={this.open}>
            <Text style={{textDecorationLine: 'underline', color:'rgb(16,156,245)'}}>{latitude}, {longitude}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={this.back} style={{marginTop: 50}}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

}
