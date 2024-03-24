import styled from "styled-components";
import { imagePath } from "../utils";
import { IGetResult } from "../api";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  width: 100%;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: -170px;
  flex-direction: column;
  div {
    margin-top: 20px;
    display: flex;
    font-size: 16px;
    font-weight: 400;
  }
`;
const Title = styled.h1`
  font-size: 100px;
  font-weight: 800;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 17px;
  width: 40%;
`;
const PlayBtn = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 115px;
  height: 45px;
  border-radius: 5px;
  color: black;
  background-color: ${(props) => props.theme.white.darker};
  cursor: pointer;
  svg {
    position: relative;
    left: -7px;
    font-size: 22px;
  }
`;
const InfoBtn = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 45px;
  border-radius: 5px;
  background-color: rgba(86, 91, 89, 0.7);
  margin-left: 10px;

  cursor: pointer;
  svg {
    position: relative;
    left: -7px;
    font-size: 30px;
  }
`;

interface ITopBannerProps {
  data: IGetResult;
  isLoading: boolean;
}

function TopBanner({ data, isLoading }: ITopBannerProps) {
  const history = useHistory();
  const homeMatch = useRouteMatch("/");
  const seriesMatch = useRouteMatch("/series");
  const movieMatch = useRouteMatch("/movies");
  const routeHistory = (id: number) => {
    if (seriesMatch) {
      return history.push(`/series/tv/${id}`);
    }
    if (movieMatch) {
      return history.push(`/movies/movie/${id}`);
    }
    if (homeMatch) {
      return history.push(`/movie/${id}`);
    }
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <Banner $bgPhoto={imagePath(data?.results[0].backdrop_path || "")}>
          <Box>
            <Title>{data?.results[0].title || data?.results[0].name}</Title>
            <Overview>
              {data?.results[0].overview.slice(0, 330) + "..."}
            </Overview>
            <div>
              <PlayBtn whileHover={{ opacity: 0.6 }}>
                <FaPlay />
                재생
              </PlayBtn>
              <InfoBtn
                onClick={() => routeHistory(data.results[0].id)}
                whileTap={{ border: "2px solid white" }}
                whileHover={{ opacity: 0.6 }}
              >
                <IoIosInformationCircleOutline />
                상세정보
              </InfoBtn>
            </div>
          </Box>
        </Banner>
      )}
    </>
  );
}

export default TopBanner;
