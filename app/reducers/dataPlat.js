import _ from 'lodash'

import * as types from '../constants/action-types'

export default function setDataFetch(state, action) {
  state = state || {
    dataPlat: []
  }

  switch (action.type) {
    case types.SET_DATA_FETCH:
      state = _.assign({}, state, { dataPlat: action.dataPlat })
      return state
    default:
      return state
  }
}
