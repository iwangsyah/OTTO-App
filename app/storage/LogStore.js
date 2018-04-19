import { AsyncStorage } from 'react-native'
import _ from 'lodash'

const STORAGE_KEY = '@Facilgo:log'
const MAX_HISTORY = 100

class LogStore {
  constructor() {
    this.history = []
    this.loaded = false
  }

  async load() {
    let historyJson = await AsyncStorage.getItem(STORAGE_KEY)
    let history = JSON.parse(historyJson) || []
    this.history = history
  }

  async save() {
    try {
      let historyJson = JSON.stringify(this.history)
      await AsyncStorage.setItem(STORAGE_KEY, historyJson)
    } catch (error) {
      // TODO: Better error handler
      console.log('error:', error)
    }
  }

  async write() {
    let args = Array.prototype.slice.call(arguments)
    let message = args.join(' ')
    this.history.unshift(message)
    if (this.history.length > MAX_HISTORY) {
      this.history = this.history.slice(0, MAX_HISTORY)
    }
    await this.save()
  }
}

const logStore = new LogStore()
logStore.load()

export default logStore
