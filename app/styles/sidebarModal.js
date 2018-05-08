import _ from 'lodash'
import * as types from '../constants/action-types'

export default function(state, action) {
  state = state || {
    visible: false,
    optionVisible: false,
  }

  switch (action.type) {
    case types.SIDEBAR_SET_VISIBILITY:
      state = _.assign({}, state, { visible: action.visible })
      return state
    default:
      return state
  }
}
