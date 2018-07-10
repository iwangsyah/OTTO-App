import React, { PropTypes, Component } from 'react'
import {
  View, Text, TouchableOpacity, TouchableWithoutFeedback, AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash'


import { menuSetVisibility } from '../actions/sidebar'
import styles from '../styles/sidebar'

class SidebarModal extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)

    this.state = {
      showDeveloperMenu: false,
    }

    this.gotoHome = this.gotoHome.bind(this)
    this.gotoUpdate = this.gotoUpdate.bind(this)
    this.gotoKontak = this.gotoKontak.bind(this)
    this.gotoDeviceInfo = this.gotoDeviceInfo.bind(this)
    this.logout = this.logout.bind(this)
  }

  async checkConnection() {
    let status = null
    try {
      const res = await fetch('https://prod.facilgo.com/');
      if (res.status === 200) {
        status = true;
      }
    } catch (e) {
      status = false;
    }
    return status
  }

  gotoHome() {
    this.props.hideModal()
  }

  async gotoUpdate() {
    let conn = await this.checkConnection()
    if (conn) {
      Actions.home({update: true})
      this.props.hideModal()
    } else {
      alert('Tidak bisa mengupdate data.\nPeriksa koneksi internet anda!')
    }
  }

  gotoKontak() {
    this.props.hideModal()
    Actions.kontak()
  }

  gotoDeviceInfo() {
    this.props.hideModal()
    Actions.deviceInfo()
  }

  logout() {
    AsyncStorage.setItem('logged', JSON.stringify("LoggedOut"))
    AsyncStorage.setItem('userLogged', JSON.stringify(null))
    this.props.hideModal()
    Actions.login()
  }

  render() {
    let { visible, signedIn, hideModal } = this.props

    return (
      <TouchableWithoutFeedback>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationIn='slideInLeft'
          animationOut='slideOutLeft'
          isVisible={visible}
          onBackdropPress={hideModal}
          style={styles.menuModal}
        >
          <View style={styles.menuModalContainer}>
            <TouchableOpacity onPress={this.gotoHome}>
              <View style={styles.titleContainer}>
                <Icon name="ios-home-outline" size={30} style={{top:5}} style={{top:15}}/>
                <Text style={[styles.menuModalItem, {marginLeft: 15}]}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.gotoUpdate}>
              <View style={styles.titleContainer}>
                <Icon name="ios-sync-outline" size={25} style={{top:5}} style={{top:15}}/>
                <Text style={[styles.menuModalItem, {marginLeft: 15}]}>Update</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.gotoKontak}>
              <View style={styles.titleContainer}>
                <Icon name="ios-call-outline" size={30} style={{top:15}}/>
                <Text style={styles.menuModalItem}>Kontak</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.logout}>
              <View style={styles.titleContainer}>
                <Icon name="ios-exit-outline" size={30} style={{top:5}}/>
                <Text style={styles.menuModalItem}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    )
  }
}


let mapStateToProps = (state, props) => {
  return {
    visible: state.sidebarModal.visible,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => {
      dispatch(menuSetVisibility(false))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarModal)
