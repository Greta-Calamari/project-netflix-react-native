import { apiKey } from '../../utils/config'
import api from '../api'

class SearchResources {
  endpoint = '/search/movie?query='
  getSearched(value: any) {
    return api.get(`${this.endpoint}${value}?&api_key=${apiKey}`)
  }
}
export default new SearchResources()
