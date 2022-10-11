import AsyncStorage from '@react-native-async-storage/async-storage'

class StorageResources {
  storageSave(key: string, value: any) {
    AsyncStorage.setItem(key, JSON.stringify(value))
  }
  storageRemove(key: string) {
    AsyncStorage.removeItem(key)
  }
  async storageGet(key: string) {
    return AsyncStorage.getItem(key)
  }
}
export default new StorageResources()
