import logStore from '../storage/LogStore'

export default function(store) {
  return function(next) {
    return function(action) {
      logStore.write(action.type)
      var result = next(action)
      return result
    }
  }
}
