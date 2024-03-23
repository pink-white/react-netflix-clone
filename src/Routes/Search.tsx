import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { IGetResult, getSearch } from "../api";
import styled from "styled-components";
import { Variants, motion } from "framer-motion";
import { imagePath } from "../utils";
import { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Detail from "../Components/Detail";

const Wrapper = styled.div`
  height: auto;
  min-height: 100%;
  margin-top: 150px;
  padding: 0px 60px;
  margin-bottom: 10px;
`;
const Keyword = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
`;
const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;
const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: 100% 100%;
  height: 260px;
  margin-bottom: 55px;
  position: relative;
  cursor: pointer;
`;
const DataTitle = styled.span`
  position: relative;
  top: calc(100% - -5px);
  margin-left: 3px;
  font-weight: 500;
  width: 210px;
`;

const NoDataInfo = styled.span`
  width: 400px;
  font-size: 13px;
  margin: 0 auto;
`;

const boxVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.1,
    y: -15,
    zIndex: 1,
    transition: { type: "tween", delay: 0.5, duration: 0.2 },
  },
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading, refetch } = useQuery<IGetResult>("search", () =>
    getSearch(keyword || "")
  );
  useEffect(() => {
    refetch();
  }, [keyword, refetch]);
  const movieMatch = useRouteMatch<{ movieId: string }>(
    "/search/movie/:movieId"
  );
  const seriesMatch = useRouteMatch<{ seriesId: string }>(
    "/search/tv/:seriesId"
  );
  const history = useHistory();
  const routeHistory = (id: number, mediaType?: string) => {
    history.push(`/search/${mediaType}/${id}?keyword=${keyword}`);
  };
  return (
    <Wrapper>
      {data?.results && <Keyword>{keyword}의 검색결과</Keyword>}
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <Row>
          {data?.results.length === 0 ? (
            <NoDataInfo>
              입력하신 검색어 `{keyword}`와(과) 일치하는 결과가 없습니다.
            </NoDataInfo>
          ) : (
            data?.results.map((data) => (
              <Box
                onClick={() => routeHistory(data.id, data.media_type)}
                $bgPhoto={imagePath(data.poster_path || data.backdrop_path)}
                key={data.id}
                variants={boxVariants}
                initial="initial"
                whileHover="hover"
                transition={{ type: "tween" }}
              >
                <DataTitle>{data.title || data.name}</DataTitle>
              </Box>
            ))
          )}
        </Row>
      )}
    </Wrapper>
  );
}

export default Search;
