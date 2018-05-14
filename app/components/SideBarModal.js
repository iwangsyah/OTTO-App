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
    this.gotoKontak = this.gotoKontak.bind(this)
    this.logout = this.logout.bind(this)
  }

  gotoHome() {
    this.props.hideModal()
  }

  gotoKontak() {
    this.props.hideModal()
    Actions.kontak()
  }

  logout() {
    this.props.hideModal()
    Actions.login()
  }

  render() {
    let { visible, signedIn, hideModal } = this.props
    let { showDeveloperMenu } = this.state

    let signInMenus = []

      signInMenus.push(
        <TouchableOpacity onPress={this.gotoHome}>
          <View style={styles.titleContainer}>
            <Icon name="ios-home-outline" size={30} style={{top:5}} style={{top:5}}/>
            <Text style={[styles.menuModalItem, {marginLeft: 15}]}>Home</Text>
          </View>
        </TouchableOpacity>
      )

      signInMenus.push(
          <TouchableOpacity onPress={this.gotoKontak}>
            <View style={styles.titleContainer}>
              <Icon name="ios-call-outline" size={30} style={{top:5}}/>
              <Text style={styles.menuModalItem}>Kontak</Text>
            </View>
          </TouchableOpacity>
      )

      signInMenus.push(
          <TouchableOpacity onPress={this.logout}>
            <View style={styles.titleContainer}>
              <Icon name="ios-exit-outline" size={30} style={{top:5}}/>
              <Text style={styles.menuModalItem}>Logout</Text>
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
          <View style={styles.menuModalContainer}>
            {signInMenus}
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
