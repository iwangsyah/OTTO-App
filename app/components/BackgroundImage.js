import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';

export default class BackgroundImage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover'
          }}
          source={require('../images/ea.jpg')}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }
});
