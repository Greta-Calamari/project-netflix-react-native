import AsyncStorage from '@react-native-async-storage/async-storage'

class StorageResources {
  storageSave(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  }
  async storageRemove(key: string) {
    try {
      await AsyncStorage.removeItem(key)
      return true
    } catch (exception) {
      return false
    }
  }

  async storageGet(key: string) {
    const res = await AsyncStorage.getItem(key)
    if (!res) return undefined
    const obj = await JSON.parse(res)
    return obj
  }
}
export default new StorageResources()
