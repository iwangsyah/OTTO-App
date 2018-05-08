import * as types from '../constants/action-types'

export function setDataFetch(dataPlat) {
  return {
    type: types.SET_DATA_FETCH,
    dataPlat: dataPlat,
  }
}
