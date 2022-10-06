import { Actor, Movie } from "../../types"
import { apiKey } from "../../utils/config"
import api from "../api"

export default class MovieResource{
    static endpoint = "/movie"
    
    static getPopulars(): Promise<Movie[]>{
        return api.get(`${this.endpoint}/popular?api_key=${apiKey}`).then(res => res.data)
    }

    static getMovieData(id:string): Promise<Movie>{
        return api.get(`${this.endpoint}/${id}?api_key=${apiKey}`).then(res => res.data)
    }
    

    static getCastData(id:string): Promise<Actor>{
        return api.get(`${this.endpoint}/${id}/casts?api_key=${apiKey}&language=en-US`).then(res=>res.data.cast)
    }
    
}