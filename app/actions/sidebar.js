import * as types from '../constants/action-types'

export function menuSetVisibility(visible) {
  return {
    type: types.SIDEBAR_SET_VISIBILITY,
    visible: visible,
  }
}

export function setUpdateExist(exist) {
  return {
    type: types.UPDATE_EXIST,
    exist: exist,
  }
}
