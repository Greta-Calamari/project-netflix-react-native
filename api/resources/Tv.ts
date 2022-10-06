import {Actor, Genres, Tv } from "../../types"
import { apiKey } from "../../utils/config"
import api from "../api"

export default class TvResources{
    static endpoint="/tv"
    static getTvShows(): Promise<Tv[]>{
        return api.get(`/discover${this.endpoint}?api_key=${apiKey}&sort_by=popularity.desc&with_genres=18`).then(res=>res.data.results)
    }

    static getTvdata(id:string): Promise<Tv>{
        return api.get(`${this.endpoint}/${id}?api_key=${apiKey}`).then(res=>res.data)

    }
    static getCastData(id:string): Promise<Actor[]>{
        return api.get(`/movie/${id}/casts?api_key=${apiKey}&language=en-US`).then(res=>res.data.cast)
    }
    static getMovieGenre(id:string): Promise<Genres[]>{
        return api.get(`${this.endpoint}/${id}?api_key=${apiKey}`).then(res => res.data.genres)
    }
}