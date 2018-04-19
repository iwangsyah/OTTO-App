import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal'
import { connect } from 'react-redux'

import { menuSetVisibility } from '../../actions/sidebar'
import BackgroundImage from '../BackgroundImage'
import SideBarModal from '../SideBarModal'

const myIcon = (<Icon name="bars" size={40} color="black" />)

class Home extends Component {
  render() {
    let { showMenu } = this.props;

    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <View style={styles.content}>
          <TouchableOpacity onPress={showMenu}>
          {myIcon}
          </TouchableOpacity>
          <View style={{marginTop:40}}>
            <Text style={{fontSize:18}}>Selamat Siang,</Text>
            <Text style={{fontSize:30}}>Catur Yundoko Edi</Text>
          </View>
        </View>
        <SideBarModal/>
      </View>
    );
  }
}

let mapStateToProps = (state) => {
  return {
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    showMenu: () => {
      dispatch(menuSetVisibility(true))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eee'
    },
    content: {
      flex: 1,
      backgroundColor: 'transparent',
      marginTop:30,
      marginLeft:20
    }
});
