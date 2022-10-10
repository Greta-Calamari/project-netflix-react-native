import { Searched } from '../../types'
import { apiKey } from '../../utils/config'
import api from '../api'

export default class SearchedResources {
  static endpoint = '/search/movie?query='
  static getSearched(): Promise<Searched[]> {
    return api.get(`${this.endpoint}${searchValue}?&api_key=${apiKey}`).then((res) => res.data.results)
  }
}
