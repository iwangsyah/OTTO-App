import * as types from '../constants/action-types'

export function menuSetVisibility(visible) {
  return {
    type: types.SIDEBAR_SET_VISIBILITY,
    visible: visible,
  }
}
