import { Searched } from '../../types'
import { apiKey } from '../../utils/config'
import api from '../api'

export default class SearchedResources {
  static endpoint = '/search/movie?query='
  static getSearched(value: any): Promise<Searched[]> {
    return api.get(`${this.endpoint}${value}?&api_key=${apiKey}`).then((res) => res.data.results)
  }
}
