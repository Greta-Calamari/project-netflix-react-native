import { Actor, Continue } from "../../types";
import { apiKey } from "../../utils/config";
import api from "../api";

export default class continueResources {

    static endpoint = "/movie"

    static getContinueData(): Promise<Continue[]>{
        return api.get(`/search${this.endpoint}?api_key=${apiKey}&language=pt-BR&query=Kagemusha,+a+Sombra+do+Samurai`).then(res => res.data)
    }
    
    static getCastData(id:string): Promise<Actor>{
        return api.get(`${this.endpoint}/${id}/casts?api_key=${apiKey}&language=en-US`).then(res=>res.data.cast)
    }
}