export interface Movie{
    id:string
    title:string
    poster_path:string
    release_date:string
    overview:string
    vote_average:number
}
export interface TV{
    id:string
    name:string
    poster_path:string
    first_air_date:string
    overview:string
    vote_average:number
}
export interface Continue{
    id:string
    name:string
    title:string
    poster_path:string
    first_air_date:string
    overview:string
    release_date:string
    vote_average:number
    runtime:number
    generes:{name:string}
}





    
