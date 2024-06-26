import styled from "styled-components";
import TopBanner from "../Components/TopBanner";
import { useQuery } from "react-query";
import { IGetResult, getPopularTv, getTopRatedTv, getTrendingTv } from "../api";
import Slider from "../Components/SliderTemplate";
import { Outlet, useMatch } from "react-router-dom";
import Detail from "../Components/Detail";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Series() {
  const { data: trendingTvData1, isLoading: trendingTvLoading1 } =
    useQuery<IGetResult>(["tv", "trending1"], () => getTrendingTv(1));
  const { data: topTvData1, isLoading: topTvLoading1 } = useQuery<IGetResult>(
    ["tv", "top1"],
    () => getTopRatedTv(1)
  );
  const { data: topTvData2, isLoading: topTvLoading2 } = useQuery<IGetResult>(
    ["tv", "top2"],
    () => getTopRatedTv(2)
  );
  const { data: topTvData3, isLoading: topTvLoading3 } = useQuery<IGetResult>(
    ["tv", "top3"],
    () => getTopRatedTv(3)
  );
  const { data: topTvData4, isLoading: topTvLoading4 } = useQuery<IGetResult>(
    ["tv", "top4"],
    () => getTopRatedTv(4)
  );
  const { data: topTvData5, isLoading: topTvLoading5 } = useQuery<IGetResult>(
    ["tv", "top5"],
    () => getTopRatedTv(5)
  );
  const seriesMatch = useMatch("/series/tv/:id");
  return (
    <Wrapper>
      {trendingTvData1 && (
        <TopBanner data={trendingTvData1} isLoading={trendingTvLoading1} />
      )}
      {topTvData2 && (
        <Slider
          data={topTvData2}
          isLoading={topTvLoading2}
          sliderTitle="인기있는 시리즈"
          category="tv"
          dataName="topTv2"
        />
      )}
      {topTvData1 && (
        <Slider
          data={topTvData1}
          isLoading={topTvLoading1}
          sliderTitle="역대 TOP 18 시리즈"
          isRanking={true}
          category="tv"
          dataName="topTv"
        />
      )}
      {topTvData3 && (
        <Slider
          data={topTvData3}
          isLoading={topTvLoading3}
          sliderTitle="보고 또 봐도 좋은 인기 시리즈"
          category="tv"
          dataName="topTv3"
        />
      )}
      {topTvData4 && (
        <Slider
          data={topTvData4}
          isLoading={topTvLoading4}
          sliderTitle="보면 좋을 시리즈들"
          category="tv"
          dataName="topTv4"
        />
      )}
      {topTvData5 && (
        <Slider
          data={topTvData5}
          isLoading={topTvLoading5}
          sliderTitle="오늘의 발견!"
          category="tv"
          dataName="topTv5"
        />
      )}
      <Outlet />
    </Wrapper>
  );
}

export default Series;
