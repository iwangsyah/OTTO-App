import { AsyncStorage } from 'react-native'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createWhitelistFilter } from 'redux-persist-transform-filter'
import thunk from 'redux-thunk'

import { enableBatching } from './lib/redux-batched-actions'
import logger from './middlewares/logger'
import logActions from './middlewares/logActions'
import reducer from './reducers/'
// import { deviceSetOrientation } from './actions/device'

const store = createStore(
  enableBatching(reducer),
  compose(
    applyMiddleware(thunk, logActions),
    //applyMiddleware(thunk, logger),
  //  autoRehydrate(),
  )
)

let persistor = null

//
// Persist store:
// When the user signs in, create a new persistor using persistStore.
// When the user logs out, pause the old persistor (which still exists in
// memory but no longer used) and create a new persistor (via persistStore),
// with different keys.
//
//
// const offlineSupportEntitiesFilter = createWhitelistFilter(
//   'entities',
//   ['inspections', 'inspectionItems']
// )
//
// const offlineSupportInspectionListingScreenFilter = createWhitelistFilter(
//   'inspectionListingScreen',
//   ['inspectionIds', 'completed', 'fetching', 'lastCreatedAt', 'maxUpdatedAt']
// )
//
// const offlineSupportAutoSyncFilter = createWhitelistFilter(
//   'autoSync',
//   ['autoSync']
// )


// function orientationListener(orientation) {
//   store.dispatch(deviceSetOrientation(orientation))
// }
//
// Orientation.addOrientationListener(orientationListener)
// orientationListener(Orientation.getInitialOrientation())

//
// export function createPersistor(userId, callback) {
//   persistor = persistStore(store, {
//     storage: AsyncStorage,
//     keyPrefix: `state/user:${userId}`,
//     whitelist: ['entities', 'inspectionListingScreen', 'autoSync'],
//     transforms: [
//       offlineSupportEntitiesFilter,
//       offlineSupportInspectionListingScreenFilter,
//       offlineSupportAutoSyncFilter,
//     ],
//   }, callback)
// }
//
// export function pausePersistor() {
//   if (persistor) {
//     persistor.pause()
//   }
// }
//
// export function purgePersistor() {
//   if (persistor) {
//     persistor.purge()
//     persistor = null
//   }
// }

export default store
