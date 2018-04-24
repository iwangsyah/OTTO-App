import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons';

const barsIcon = (<Icon name="ios-arrow-back" size={30} color="black" />)

export default class DetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  back() {
    Actions.pop()
  }

  renderHeader() {
    let { search } = this.state
    let { item } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.back.bind(this)}>
          {barsIcon}
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20}}> {item.plat} </Text>
      </View>
    )
  }

  render() {
    let { item } = this.props
    return(
      <View>
        {this.renderHeader()}
        <View style={{margin:10 }}>
          <Text style={{fontWeight:'bold'}}> MODEL : {item.name}</Text>
        </View>
        <View style={{margin:10, marginTop:0}}>
          <Text style={{fontWeight:'bold'}}> WARNA : {item.color}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c661e8',
    flexDirection: 'row',
    height: 70,
    padding: 10,
    paddingTop: 20,
  },
});
