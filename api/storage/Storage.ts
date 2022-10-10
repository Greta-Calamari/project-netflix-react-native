import AsyncStorage from '@react-native-async-storage/async-storage'
import { Movie } from '../../types'

export default class Storage {
  static addToFavorites = async (item: Movie) => {
    AsyncStorage.setItem('id', JSON.stringify([...favorites, item]))
    setFavorites([...favorites, item])
  }
}
