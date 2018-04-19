import React, { PropTypes, Component } from 'react'
import {
  View, Text, TouchableOpacity, TouchableWithoutFeedback
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
    this.gotoBantuan = this.gotoBantuan.bind(this)
  }

  gotoHome() {
    Actions.home()
    this.props.hideModal()
  }

  gotoBantuan() {
    Actions.bantuan()
    this.props.hideModal()
  }

  render() {
    let { visible, signedIn, logout, hideModal } = this.props
    let { showDeveloperMenu } = this.state
    let reset = () => {
      this.props.hideModal()
    }

    let signInMenus = []

      signInMenus.push(
        <TouchableOpacity onPress={this.gotoSyncManager}>
          <View style={styles.titleContainer}>
            <Icon name="ios-home-outline" size={30} style={{top:5}} style={{top:5}}/>
            <Text style={[styles.menuModalItem, {marginLeft: 15}]}>Beranda</Text>
          </View>
        </TouchableOpacity>
      )

      signInMenus.push(
          <TouchableOpacity onPress={this.gotoAutoSyncSelection}>
            <View style={styles.titleContainer}>
              <Icon name="ios-download-outline" size={30} style={{top:5}}/>
              <Text style={styles.menuModalItem}>Kotak Masuk</Text>
            </View>
          </TouchableOpacity>
      )

      signInMenus.push(
          <TouchableOpacity onPress={logout}>
            <View style={styles.titleContainer}>
              <Icon name="ios-person-outline" size={30} style={{top:5}}/>
              <Text style={styles.menuModalItem}>Akun Saya</Text>
            </View>
          </TouchableOpacity>
      )

      signInMenus.push(
          <TouchableOpacity onPress={this.gotoBantuan}>
            <View style={styles.titleContainer}>
              <Icon name="ios-information-circle-outline" size={30} style={{top:5}}/>
              <Text style={[styles.menuModalItem, {marginLeft: 15}]}>Device Info</Text>
            </View>
          </TouchableOpacity>
      )


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
          <TouchableWithoutFeedback onPress={this.triggerDeveloperMenu}>
            <View style={styles.menuModalContainer}>
              {signInMenus}
            </View>
          </TouchableWithoutFeedback>
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
