import { useQuery } from "react-query";
import {
  IGetResult,
  getTrendingTv,
  getPopularMovies,
  getUpcomingMovies,
  getAllTrending,
} from "../api";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import TopBanner from "../Components/TopBanner";
import Slider from "../Components/SliderTemplate";
import Detail from "../Components/Detail";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  const { data: upcomingData, isLoading: upcomingLoading } =
    useQuery<IGetResult>(["movies", "nowPlaying"], getUpcomingMovies);
  const { data: trendingTvData1, isLoading: trendingTvLoading1 } =
    useQuery<IGetResult>(["tv", "trending1"], () => getTrendingTv(1));
  const { data: trendingTvData2, isLoading: trendingTvLoading2 } =
    useQuery<IGetResult>(["tv", "trending2"], () => getTrendingTv(2));
  const { data: popularMovieData, isLoading: popularMovieLoading } =
    useQuery<IGetResult>(["movies", "papular"], () => getPopularMovies(1));
  const { data: allTrendingData, isLoading: allTrendingLoading } =
    useQuery<IGetResult>(["all", "trending"], getAllTrending);
  const movieMatch = useRouteMatch<{ movieId: string }>("/movie/:movieId");
  const seriesMatch = useRouteMatch<{ seriesId: string }>("/tv/:seriesId");

  return (
    <Wrapper>
      {upcomingData && (
        <TopBanner data={upcomingData} isLoading={upcomingLoading} />
      )}
      {upcomingData && (
        <Slider
          data={upcomingData}
          sliderTitle="상영중인 영화"
          isLoading={upcomingLoading}
          category="movie"
          dataName="upcoming"
        />
      )}
      {trendingTvData2 && (
        <Slider
          data={trendingTvData2}
          sliderTitle="지금 뜨는 콘텐츠"
          isLoading={trendingTvLoading2}
          category="tv"
          dataName="trendingTv2"
        />
      )}
      {popularMovieData && (
        <Slider
          data={popularMovieData}
          sliderTitle="오늘 Top 18 영화"
          isLoading={popularMovieLoading}
          isRanking={true}
          category="movie"
          dataName="popularMovie"
        />
      )}
      {trendingTvData1 && (
        <Slider
          data={trendingTvData1}
          sliderTitle="오늘 Top 18 시리즈"
          isLoading={trendingTvLoading1}
          isRanking={true}
          category="tv"
          dataName="trendingTv"
        />
      )}
      {allTrendingData && (
        <Slider
          data={allTrendingData}
          sliderTitle="지금 인기있는 시리즈, 영화"
          isLoading={allTrendingLoading}
          dataName="allTrending"
        />
      )}
    </Wrapper>
  );
}

export default Home;
