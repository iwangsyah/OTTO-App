import _ from 'lodash'
import { combineReducers } from 'redux'

import * as types from '../constants/action-types'
import sidebarModal from './sidebarModal'
import loginScreen from './loginScreen'
import routes from './routes'


const appReducer = combineReducers({
  // routes,
  // entities,
  // session,
  // alert,
  // autoSync,
  // device,
  // menu,
  // modal,
  // camera,
  // inspectionListingScreen,
  // inspectionCreateScreen,
  // inspectionScreen,
  // selectResidentScreen,
  // residentSignatureScreen,
  // copyRoomScreen,
  // sidebarModal
  loginScreen
})

const rootReducer = (state, action) => {
  if (action.type == types.LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
