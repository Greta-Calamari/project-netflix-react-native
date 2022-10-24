import { StackNavigationProp } from '@react-navigation/stack'

export interface Movie {
  id: string
  title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  runtime: number
  generes: string
  name?: string
  first_air_date?: string
  isInFavourite?: boolean
  handleFavouritesClick?: Function
}
export interface Searched {
  id: string
  title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  runtime: number
  generes: string
}

export interface Actor {
  id: string
  original_name: string
  character: string
  profile_path: string
}
export interface Genres {
  id: string
  name: string
}
export interface SingleMovieRouteProps {
  id: string
  title?: string
  release_date?: string
  poster_path: string
  overview: string
  runtime: number
  vote_average: number
  generes: string
  first_air_date?: string
  name?: string
  original_name?: string
  character?: string
}
export interface FavouriteStackParams {
  favMovieArray?: any
  handleRemove?: any
  refreshFlatlist?: any
  handleFavouritesClick?: any
  searchedMovies?: Searched
}
export interface HomeStackParams {
  favMovieArray: any
  handleRemove: any
  refreshFlatlist?: any
}
export type StackParamsList = {
  Home: HomeStackParams | undefined
  SingleMovie: SingleMovieRouteProps | undefined
  SingleTv: SingleMovieRouteProps | undefined
  Play: undefined
  Saved: undefined | SingleMovieRouteProps
  FavouriteBox: FavouriteStackParams | undefined
  SingleSearched: FavouriteStackParams | undefined
}

export type NavigationProps = StackNavigationProp<StackParamsList>
