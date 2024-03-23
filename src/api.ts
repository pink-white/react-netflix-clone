const API_KEY = "5eb7491ca3a1c7c0c4c9453cc171e630";
const BASE_URL = "https://api.themoviedb.org/3";

export const timeSecond = Math.floor(Date.now() / 1000)
  .toString()
  .slice(0, 10);

export interface IData {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  media_type?: string;
  first_air_date?: string;
  release_date?: string;
}

export interface IGetResult {
  results: IData[];
}

export interface IDetailResult {
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  runtime?: number;
  release_date?: number;
  vote_average?: number;
  season_number?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  first_air_date?: string;
  last_air_date?: string;
}

export interface ICreditData {
  cast: {
    known_for_department: string;
    name: string;
    job?: string;
  }[];
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
}

export function getTrendingMovies(page: number) {
  return fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=ko-KR&page=${page}`
  ).then((response) => response.json());
}

export function getPopularMovies(page: number) {
  return fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
  ).then((response) => response.json());
}

export function getTopRatedMovies(page: number) {
  return fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`
  ).then((response) => response.json());
}

export function getAllTrending() {
  return fetch(
    `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=ko-KR&page=2`
  ).then((response) => response.json());
}

export function getTrendingTv(page: number) {
  return fetch(
    `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=ko-KR&page=${page}`
  ).then((response) => response.json());
}

export function getPopularTv(page: number) {
  return fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
  ).then((response) => response.json());
}

export function getTopRatedTv(page: number) {
  return fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=${page}`
  ).then((response) => response.json());
}

export function getSearch(keyword: string) {
  return fetch(
    `${BASE_URL}/search/multi?query=${keyword}&api_key=${API_KEY}&include_adult=true&language=ko-KR&page=1`
  ).then((response) => response.json());
}

export function getDetail(category: string | undefined, id: string) {
  return fetch(
    `${BASE_URL}/${category}/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getSimilar(category: string | undefined, id: string) {
  return fetch(
    `${BASE_URL}/${category}/${id}/similar?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getCredit(category: string | undefined, id: string) {
  return fetch(
    `${BASE_URL}/${category}/${id}/credits?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
