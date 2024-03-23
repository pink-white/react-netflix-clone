import styled from "styled-components";
import TopBanner from "../Components/TopBanner";
import { useQuery } from "react-query";
import {
  IGetResult,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../api";
import Slider from "../Components/SliderTemplate";
import { useRouteMatch } from "react-router-dom";
import Detail from "../Components/Detail";

const Wrapper = styled.div``;

function Movie() {
  const { data: trendingMovieData1, isLoading: trendingMovieLoading1 } =
    useQuery<IGetResult>(["movie", "trending"], () => getTrendingMovies(1));
  const { data: trendingMovieData2, isLoading: trendingMovieLoading2 } =
    useQuery<IGetResult>(["movie", "trending2"], () => getTrendingMovies(3));
  const { data: popularMovieData1, isLoading: popularMovieLoading1 } =
    useQuery<IGetResult>(["movie", "popular"], () => getPopularMovies(3));
  const { data: topMovieData1, isLoading: topMovieLoading1 } =
    useQuery<IGetResult>(["movie", "top1"], () => getTopRatedMovies(1));
  const { data: topMovieData2, isLoading: topMovieLoading2 } =
    useQuery<IGetResult>(["movie", "top2"], () => getTopRatedMovies(2));
  const { data: topMovieData3, isLoading: topMovieLoading3 } =
    useQuery<IGetResult>(["movie", "top3"], () => getTopRatedMovies(3));
  const movieMatch = useRouteMatch<{ movieId: string }>(
    "movies/movie/:movieId"
  );
  return (
    <Wrapper>
      {trendingMovieData1 && (
        <TopBanner
          data={trendingMovieData1}
          isLoading={trendingMovieLoading1}
        />
      )}
      {popularMovieData1 && (
        <Slider
          data={popularMovieData1}
          isLoading={popularMovieLoading1}
          sliderTitle="지금 인기있는 영화"
          category="movie"
        />
      )}
      {topMovieData1 && (
        <Slider
          data={topMovieData1}
          isLoading={topMovieLoading1}
          sliderTitle="역대 TOP18 영화"
          isRanking={true}
          category="movie"
        />
      )}
      {topMovieData2 && (
        <Slider
          data={topMovieData2}
          isLoading={topMovieLoading2}
          sliderTitle="찬사를 받은 영화"
          category="movie"
        />
      )}
      {topMovieData3 && (
        <Slider
          data={topMovieData3}
          isLoading={topMovieLoading3}
          sliderTitle="좋아할만한 영화"
          category="movie"
        />
      )}
      {trendingMovieData2 && (
        <Slider
          data={trendingMovieData2}
          isLoading={trendingMovieLoading2}
          sliderTitle="진심이 느껴지는 영화"
          category="movie"
        />
      )}
      {movieMatch && <Detail />}
    </Wrapper>
  );
}

export default Movie;
