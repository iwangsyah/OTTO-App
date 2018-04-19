export default function(store) {
  return function(next) {
    return function (action) {
      console.log('dispatching', action)
      var result = next(action)
      console.log('next state', store.getState())
      return result
    }
  }
}
