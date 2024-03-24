import { AnimatePresence, Variants, motion } from "framer-motion";
import styled from "styled-components";
import { IGetResult } from "../api";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { imagePath } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 390px;
  &:last-of-type {
    margin-bottom: 240px; /* 마지막 Wrapper에 대한 margin-bottom을 제거. */
  }
  &:hover {
    .first,
    .second {
      opacity: 0.7;
    }
  }
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20vh;
  background-color: black;
`;
const SliderTitle = styled.h2`
  position: absolute;
  top: -117px;
  grid-template-columns: repeat();
  font-size: 21px;
  font-weight: 700;
  padding-left: 58px;
`;
const BtnBox = styled.div<{ $isRanking: boolean }>`
  width: 60px;
  height: ${(props) => (props.$isRanking ? "260px" : " 280px")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -80px;
  border-radius: 5px;
  opacity: 0;
  background-color: ${(props) => props.theme.black.veryDark};
  z-index: 100;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &.first {
    left: 0px;
  }
  &.second {
    right: 0px;
  }
  &:hover {
    svg {
      transform: scale(1.3);
    }
  }
`;
const SliderBtn = styled.svg`
  width: 28px;
  height: 30px;
  fill: white;
  transition: 0.2s ease-in-out;
`;

const Row = styled(motion.div)<{ $isRanking: boolean }>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
  position: absolute;
  top: -80px;
  left: ${(props) => (props.$isRanking ? "33px" : null)};
  padding: 0px 60px;
`;
const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 280px;
  border-radius: 5px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: 100% 100%;
  background-position: center;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const RankingBox = styled(motion.div)<{ $bgPhoto: string }>`
  height: 260px;
  width: 175px;
  border-radius: 5px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: 100% 100%;
  background-position: center;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const BoxIndex = styled.h1`
  font-size: 120px;
  font-weight: 700;
  color: white;
  position: relative;
  top: -18px;
  left: -45px;
  font-style: oblique;
  width: 10px;
  letter-spacing: -12px;
`;
const MovieTitle = styled.h3`
  position: absolute;
  top: calc(100% - -5px);
  margin-left: 3px;
  font-weight: 500;
  width: 210px;
`;

const Info = styled(motion.div)`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${(props) => props.theme.black.veryDark};
  text-align: center;
  position: absolute;
  bottom: -115px;
  width: 100%;
  height: 120px;
  opacity: 0;
  padding-left: 7px;
  padding-right: 15px;
`;
const InfoBox = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 30px;
  }
`;

const rowVariants: Variants = {
  hidden: (back: boolean) => ({
    x: back ? -window.innerWidth : window.innerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth : -window.innerWidth,
  }),
};
const boxVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -15,
    transition: { type: "tween", delay: 0.5, duration: 0.2 },
  },
};
const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: { type: "tween", delay: 0.5, duration: 0.2 },
  },
};

interface ISliderProps {
  data: IGetResult;
  sliderTitle: string;
  isLoading: boolean;
  isRanking?: boolean;
  category?: string;
  dataName: string;
}

function Slider({
  data,
  sliderTitle,
  isLoading,
  isRanking,
  category,
  dataName,
}: ISliderProps) {
  const homeMatch = useMatch("/");
  const seriesMatch = useMatch("/series");
  const movieMatch = useMatch("/movies");
  const routerNavigate = (id: number, mediaType?: string) => {
    if (seriesMatch) {
      return navigate(`/series/tv/${id}?n=${dataName}`);
    }
    if (movieMatch) {
      return navigate(`/movies/movie/${id}?n=${dataName}`);
    }
    if (homeMatch) {
      return navigate(
        category
          ? `/${category}/${id}?n=${dataName}`
          : `/${mediaType}/${id}?n=${dataName}`
      );
    }
  };

  const offset = 6;
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const plusIndex = () => {
    if (leaving) return;
    if (data) {
      const totalMovies = data?.results.length - 1;
      const maxIndexMovies = Math.floor(totalMovies / offset) - 1;
      setLeaving(true);
      setBack(false);
      setIndex((prev) => (prev === maxIndexMovies ? 0 : prev + 1));
    }
  };
  const minusIndex = () => {
    if (leaving) return;
    if (data) {
      const totalMovies = data?.results.length - 1;
      const minIndexMovies = Math.floor(offset / totalMovies);
      setLeaving(true);
      setBack(true);
      setIndex((prev) => (prev === minIndexMovies ? 2 : prev - 1));
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <SliderTitle>{sliderTitle}</SliderTitle>
          <BtnBox
            $isRanking={isRanking || false}
            className="first"
            onClick={minusIndex}
          >
            <SliderBtn xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </SliderBtn>
          </BtnBox>
          <AnimatePresence
            custom={back}
            initial={false}
            onExitComplete={toggleLeaving}
          >
            <Row
              custom={back}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 0.5 }}
              key={index}
              $isRanking={isRanking || false}
            >
              {data.results
                .slice(1)
                .slice(offset * index, offset * index + offset)
                .map((data, boxIndex) => (
                  <>
                    {isRanking ? (
                      <RankingBox
                        onClick={() => routerNavigate(data.id)}
                        layoutId={`${dataName}${data.id}`}
                        key={data.id}
                        $bgPhoto={imagePath(data.poster_path)}
                        variants={boxVariants}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                      >
                        {/*     <Info variants={infoVariants}>
                  <InfoBox>
                    <IoChevronDownCircleOutline />
                  </InfoBox>
                </Info> */}
                        <BoxIndex>{index * offset + boxIndex + 1}</BoxIndex>
                      </RankingBox>
                    ) : (
                      <Box
                        onClick={() => routerNavigate(data.id, data.media_type)}
                        layoutId={`${dataName}${data.id}`}
                        key={data.id}
                        $bgPhoto={imagePath(data.poster_path)}
                        variants={boxVariants}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                      >
                        {/* <Info variants={infoVariants}>
                          <InfoBox>
                            <IoChevronDownCircleOutline />
                          </InfoBox>
                        </Info> */}
                      </Box>
                    )}
                  </>
                ))}
            </Row>
          </AnimatePresence>
          <BtnBox
            $isRanking={isRanking || false}
            className="second"
            onClick={plusIndex}
          >
            <SliderBtn xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </SliderBtn>
          </BtnBox>
        </>
      )}
    </Wrapper>
  );
}

export default Slider;
