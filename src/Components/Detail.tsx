import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { imagePath } from "../utils";
import { useQuery } from "react-query";
import {
  ICreditData,
  IDetailResult,
  IGetResult,
  getCredit,
  getDetail,
  getSimilar,
  timeSecond,
} from "../api";
import { FaPlay } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { FaRegThumbsUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

const MovieModal = styled(motion.div)`
  width: 850px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 60px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 10px;
  z-index: 99999;
  background-color: ${(props) => props.theme.black.veryDark};
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 80px;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  opacity: 0;
  z-index: 99998;
`;
const ModalCover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 500px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.$bgPhoto});
  background-size: 100% 100%;
  background-position: center center;
  border-radius: 10px;
  position: relative;
  padding-left: 45px;
`;
const ExitBtn = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.black.darker};
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  font-size: 30px;
`;
const BtnBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 65px;
  div {
    margin-right: 7px;
  }
`;
const PlayBtn = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 115px;
  height: 43px;
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
const CircleBtn = styled(motion.div)`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background-color: rgba(35, 36, 35, 0.2);
  border: 2px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 17px;
  }
  .plusSvg {
    font-size: 27px;
  }
`;
const ModalTitle = styled.h2`
  font-size: 60px;
  font-weight: 600;
  position: relative;
  top: -210px;
  left: 40px;
  line-height: 1;
`;
const ModalBox = styled.div`
  padding-left: 45px;
  width: 480px;
  position: relative;
  top: -40px;
  display: flex;
  width: 100%;
`;
const InfoBox = styled.div`
  display: flex;
`;
const ModalInfo = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;
const DateSpan = styled.span`
  color: rgb(75, 194, 103);
  margin-right: 10px;
  font-size: 16px;
  font-weight: 300;
`;
const TimeSpan = styled(DateSpan)`
  color: rgb(178, 176, 176);
`;

const Hd = styled.div`
  border: 1px solid rgb(137, 136, 136);
  width: 30px;
  height: 20px;
  color: rgb(209, 207, 207);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  border-radius: 3px;
`;
const ModalOverview = styled.p`
  width: 475px;
  margin-top: 30px;
  line-height: 1.5;
`;

const ModalSubInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  right: -26px;
  top: -5px;
  font-size: 14px;

  padding-right: 35px;

  h3 {
    color: darkgray;
    margin-right: 4px;
  }
  h4 {
    margin-right: 3px;
  }
  div {
    display: flex;
    margin-bottom: 15px;
    width: 260px;
    flex-wrap: wrap;
  }
`;

const Similar = styled.div`
  padding: 0px 45px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 80px;
`;
const SimilarTitle = styled.h2`
  padding-left: 45px;
  font-size: 25px;
  font-weight: 600;
  position: relative;
  top: -25px;
`;
const SimilarBox = styled.div`
  width: 240px;
  height: 360px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
`;
const SimilarImg = styled.div<{ $bgPhoto: string }>`
  width: 240px;
  height: 150px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-size: 100% 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  position: relative;
  span {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 16px;
    width: 225px;
  }
`;
const SimilarInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 15px;
  position: relative;
  h2 {
    margin-left: 7px;
    color: darkgray;
  }
  .similarBtn {
    position: absolute;
    right: 10px;
    width: 37px;
    height: 37px;
  }
  .similarPlusSvg {
    font-size: 23px;
  }
`;
const SimilarOverview = styled.p`
  padding: 0px 10px;
  font-size: 14px;
  color: rgb(188, 188, 188);
`;

const NoSimilarData = styled.span`
  width: 400px;
  margin: 0 auto;
  padding-top: 30px;
  color: darkgray;
`;
const Hr = styled.div`
  width: 90.5%;
  border: 1px solid rgb(74, 73, 73);
  margin: 0 auto;
`;
const DetailInfoBox = styled.div`
  padding-left: 45px;
  display: flex;
  flex-direction: column;
`;
const DetailInfoTitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
`;

function convertMinutesToHoursAndMinutes(minutes: number | undefined) {
  if (minutes === undefined) return;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}시간 ${remainingMinutes}분`;
}

function Detail() {
  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 body에 overflow를 없앰
    document.body.style.overflowY = "hidden";
    // 컴포넌트가 언마운트되었을 때 body의 overflow를 원래대로 되돌림
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  const history = useHistory();
  const overlayClick = () => {
    history.goBack();
  };
  const { id } = useParams<{ id: string }>();
  const seriesMatch = useRouteMatch<{ seriesId: string }>(`/tv/:seriesId`);
  const seriesMatch2 = useRouteMatch<{ seriesId: string }>(
    `/series/tv/:seriesId`
  );
  const seriesMatch3 = useRouteMatch<{ seriesId: string }>(
    `/search/tv/:seriesId`
  );
  const movieMatch = useRouteMatch<{ movieId: string }>(`/movie/:movieId`);
  const movieMatch2 = useRouteMatch<{ movieId: string }>(
    `/movies/movie/:movieId`
  );
  const movieMatch3 = useRouteMatch<{ movieId: string }>(
    `/search/movie/:movieId`
  );
  const isSeries = seriesMatch || seriesMatch2 || seriesMatch3;
  const isMovie = movieMatch || movieMatch2 || movieMatch3;
  const category = isMovie ? "movie" : isSeries ? "tv" : undefined;
  const { data: detailData, isLoading: detailLoading } =
    useQuery<IDetailResult>("detail", () => getDetail(category, id));
  const { data: similarData, isLoading: similarLoading } = useQuery<IGetResult>(
    "similar",
    () => getSimilar(category, id)
  );
  const { data: creditData, isLoading: creditLoading } = useQuery<ICreditData>(
    "credit",
    () => getCredit(category, id)
  );
  return (
    <>
      {detailLoading && similarLoading && creditLoading ? (
        <h1>Loading</h1>
      ) : (
        <AnimatePresence>
          {isSeries || isMovie ? (
            <>
              <Overlay
                onClick={overlayClick}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <MovieModal
                layoutId={id + ""}
                style={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "tween" }}
              >
                {detailData && (
                  <>
                    <ModalCover $bgPhoto={imagePath(detailData.backdrop_path)}>
                      <ExitBtn
                        onClick={overlayClick}
                        whileTap={{ border: "3px solid white" }}
                      >
                        <IoClose />
                      </ExitBtn>
                      <BtnBox>
                        <PlayBtn whileHover={{ opacity: 0.6 }}>
                          <FaPlay />
                          재생
                        </PlayBtn>
                        <CircleBtn whileHover={{ borderColor: "white" }}>
                          <GoPlus className="plusSvg" />
                        </CircleBtn>
                        <CircleBtn whileHover={{ borderColor: "white" }}>
                          <FaRegThumbsUp />
                        </CircleBtn>
                      </BtnBox>
                    </ModalCover>
                    <ModalTitle>
                      {detailData.title?.slice(0, 18) ||
                        detailData.name?.slice(0, 18)}
                    </ModalTitle>
                    <ModalBox>
                      <ModalInfo>
                        <InfoBox>
                          <DateSpan>
                            {detailData.last_air_date?.slice(0, 4) ||
                              String(detailData.release_date).slice(0, 4)}
                          </DateSpan>
                          <TimeSpan>
                            {detailData.runtime
                              ? convertMinutesToHoursAndMinutes(
                                  detailData.runtime
                                )
                              : detailData.number_of_seasons === 1
                              ? `에피소드 ${detailData.number_of_episodes} 개`
                              : `시즌 ${detailData.number_of_seasons} 개`}
                          </TimeSpan>
                          <Hd>HD</Hd>
                        </InfoBox>

                        {detailData.overview ? (
                          <ModalOverview>{detailData.overview}</ModalOverview>
                        ) : (
                          <ModalOverview>
                            개요가 존재하지 않습니다.
                          </ModalOverview>
                        )}
                      </ModalInfo>
                      <ModalSubInfo>
                        <div>
                          <h3>출연:</h3>
                          {creditData?.cast.slice(0, 4).map((cast, index) => (
                            <h4 key={cast.name}>
                              {cast.known_for_department === "Acting" &&
                                cast.name}

                              {index !==
                                creditData.cast.slice(0, 4).length - 1 && ", "}
                            </h4>
                          ))}
                        </div>
                        <div>
                          <h3>장르:</h3>
                          {detailData.genres &&
                            detailData.genres.map(
                              (
                                genre: { id: number; name: string },
                                index: number
                              ) => (
                                <h4 key={genre.id}>
                                  {genre.name}
                                  {index !== detailData.genres.length - 1 &&
                                    ", "}
                                </h4>
                              )
                            )}
                        </div>
                        <div>
                          <h3>평점:</h3>
                          <h4>{String(detailData.vote_average).slice(0, 3)}</h4>
                        </div>
                      </ModalSubInfo>
                    </ModalBox>
                  </>
                )}
                <SimilarTitle>함께 시청된 콘텐츠</SimilarTitle>
                <Similar>
                  {similarData && similarData.results.length === 0 ? (
                    <NoSimilarData>
                      함께 시청된 콘텐츠가 존재하지않습니다.
                    </NoSimilarData>
                  ) : (
                    similarData?.results
                      .filter((data) => data.backdrop_path && data.overview)
                      .map((data) => (
                        <SimilarBox key={data.id}>
                          <SimilarImg $bgPhoto={imagePath(data.backdrop_path)}>
                            <span>{data.title || data.name}</span>
                          </SimilarImg>
                          <SimilarInfo>
                            <Hd>HD</Hd>
                            <h2>
                              {data.release_date?.slice(0, 4) ||
                                data.first_air_date?.slice(0, 4)}
                            </h2>
                            <CircleBtn
                              className="similarBtn"
                              whileHover={{ borderColor: "white" }}
                            >
                              <GoPlus className="similarPlusSvg" />
                            </CircleBtn>
                          </SimilarInfo>
                          <SimilarOverview>
                            {`${data.overview.slice(0, 145)}...`}
                          </SimilarOverview>
                        </SimilarBox>
                      ))
                  )}
                </Similar>
                <Hr />
                <DetailInfoBox>
                  <DetailInfoTitle>
                    {detailData?.name || detailData?.title} 상세정보
                  </DetailInfoTitle>
                  <div>
                    <h3>감독: </h3>
                    {creditData?.cast.map((director) => {
                      if (
                        director.job === "Director" &&
                        director.known_for_department === "Directing"
                      ) {
                        return <h4 key={director.name}>{director.name}</h4>;
                      }
                      return <h4>wow</h4>;
                    })}
                  </div>
                </DetailInfoBox>
              </MovieModal>
            </>
          ) : null}
        </AnimatePresence>
      )}
    </>
  );
}

export default Detail;
