import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { IGetResult, getSearch } from "../api";
import styled from "styled-components";
import { Variants, motion } from "framer-motion";
import { imagePath } from "../utils";
import { useEffect } from "react";
import { useNavigate, Outlet, useSearchParams } from "react-router-dom";

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

const NoDataInfo = styled.span`
  width: 400px;
  font-size: 13px;
  margin-bottom: 310px;
`;

const boxVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -15,
    zIndex: 1,
    transition: { type: "tween", delay: 0.5, duration: 0.2 },
  },
};

function Search() {
  const [readParams] = useSearchParams();
  const keyword = readParams.get("k");
  const { data, isLoading, refetch } = useQuery<IGetResult>("search", () =>
    getSearch(keyword || "")
  );
  useEffect(() => {
    refetch();
  }, [keyword, refetch]);
  const navigate = useNavigate();
  const routeHistory = (id: number, mediaType?: string) => {
    navigate(`/search/${mediaType}/${id}?k=${keyword}&n=search`);
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
            data?.results
              .filter((data) => data.backdrop_path || data.poster_path)
              .map((data) => (
                <Box
                  layoutId={`search${data.id}`}
                  onClick={() => routeHistory(data.id, data.media_type)}
                  $bgPhoto={imagePath(data.poster_path || data.backdrop_path)}
                  key={data.id}
                  variants={boxVariants}
                  initial="initial"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                ></Box>
              ))
          )}
        </Row>
      )}
      <Outlet />
    </Wrapper>
  );
}

export default Search;
