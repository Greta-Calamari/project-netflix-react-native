import { Actor, Genres, Watched } from '../../types'
import { apiKey } from '../../utils/config'
import api from '../api'

export default class WatchedResources {
  static endpoint = '/movie'

  static getWatched(): Promise<Watched[]> {
    return api
      .get(`/search${this.endpoint}?api_key=${apiKey}&language=pt-BR&query=Kagemusha,+a+Sombra+do+Samurai`)
      .then((res) => res.data.results)
  }
  static getMovieGenre(id: string): Promise<Genres[]> {
    return api.get(`${this.endpoint}/${id}?api_key=${apiKey}`).then((res) => res.data.genres)
  }
  static getCastData(id: string): Promise<Actor> {
    return api.get(`${this.endpoint}/${id}/casts?api_key=${apiKey}&language=en-US`).then((res) => res.data.cast)
  }
}
