import styled from "styled-components";
import {
  Variants,
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegBell } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { RiChatSmileLine, RiCustomerService2Fill } from "react-icons/ri";
import { IoMdArrowDropup } from "react-icons/io";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 65px;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 99999;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  &:last-of-type {
    position: relative;
    right: -10px;
  }
  .bellSvg {
    font-size: 22px;
    cursor: pointer;
  }
`;
const Logo = styled(motion.svg)`
  position: relative;
  bottom: -2px;
  margin-right: 50px;
  width: 100px;
  height: 30px;
  cursor: pointer;
  fill: ${(props) => props.theme.red};
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled(motion.li)`
  margin-right: 20px;
  position: relative;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Circle = styled(motion.span)`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;
const Search = styled.form`
  display: flex;
  align-items: center;
  color: white;
  position: relative;
`;
const SearchSvg = styled(motion.svg)`
  height: 27px;
  fill: currentColor;
  cursor: pointer;
  margin-right: 15px;
`;
const SearchInput = styled(motion.input)`
  transform-origin: right center;
  background-color: transparent;
  outline: none;
  border: 1px solid ${(props) => props.theme.white.darker};
  padding: 8px;
  padding-left: 40px;
  z-index: -1;
  position: absolute;
  right: 15px;
  font-size: 13px;
  color: white;
  border-radius: 2px;
  width: 250px;
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    .arrowSvg {
      transform: rotateZ(180deg);
    }
    .ProfileModal {
      opacity: 1;
      visibility: visible;
    }
  }
`;
const ProfileImg = styled.img`
  width: 33px;
  height: 33px;
  border-radius: 5px;
  margin-left: 15px;
  margin-right: 6px;
`;
const ProfileArrow = styled.svg`
  height: 14px;
  width: 14px;
  fill: white;
  transition: transform 0.2s ease-in-out;
`;
const ProfileModal = styled.div`
  position: absolute;
  bottom: -227px;
  left: -119px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 195px;
  height: 210px;
  background-color: black;
  border: 1px solid ${(props) => props.theme.black.lighter};
  opacity: 0;
  visibility: hidden;
  transition: 0.2s ease-in-out;
  .upArrowSvg {
    font-size: 25px;
    position: absolute;
    top: -20px;
    right: 30px;
  }
`;
const ModalItem = styled.div`
  display: flex;
  align-items: center;

  padding: 5px 15px;
  span {
    font-size: 12px;
  }
  svg {
    font-size: 24px;
    margin-right: 5px;
    color: darkgray;
  }
`;
const Hr = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.black.lighter};
  margin-top: 7px;
  margin-bottom: 13px;
`;
const Span = styled.span`
  text-align: center;
  margin: 0 auto;
  font-size: 12px;
`;

const navVariants: Variants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};
const logoVariants: Variants = {
  initial: {
    fillOpacity: 1,
    strokeWidth: 0,
  },
  active: {
    scale: 1.1,
    fillOpacity: 0,
    strokeWidth: 2,
    stroke: "white",
  },
};
interface IForm {
  keyword: string;
}
function Header() {
  const homeMatch = useRouteMatch("/");
  const homeMatch2 = useRouteMatch("/movie/:id/");
  const homeMatch3 = useRouteMatch("/tv/:id/");
  const home = homeMatch || homeMatch2 || homeMatch3;
  const seriesMatch = useRouteMatch("/series");
  const movieMatch = useRouteMatch("/movies");
  const isHome = home && !seriesMatch && !movieMatch;
  const { scrollY } = useScroll();
  const navAnime = useAnimation();
  // nav animate prop 조건문이외의 방법
  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (scroll < 30) {
      navAnime.start("top");
    } else {
      navAnime.start("scroll");
    }
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnime = useAnimation();
  const openSearch = () => {
    const searchInput = document.getElementById("searchInput");
    inputAnime.start({
      scaleX: 1,
    });
    setSearchOpen(true);
    searchInput?.focus();
  };
  const closeSearch = (e: any) => {
    const searchInput = document.getElementById("searchInput");
    if (e.target !== searchInput && searchOpen) {
      inputAnime.start({ scaleX: 0 });
      setSearchOpen(false);
    }
  };
  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    history.push(`/search?k=${data.keyword}`);
  };
  return (
    <Nav
      variants={navVariants}
      initial="top"
      animate={navAnime}
      onClick={closeSearch}
    >
      <Column>
        <Link to="/">
          <Logo
            variants={logoVariants}
            initial="initial"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item whileHover={{ opacity: 0.5 }}>
            <Link to="/">홈{isHome && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item whileHover={{ opacity: 0.5 }}>
            <Link to="/series">
              시리즈
              {seriesMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item whileHover={{ opacity: 0.5 }}>
            <Link to="/movies">
              영화
              {movieMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Column>
      <Column>
        <Search onSubmit={handleSubmit(onValid)}>
          <SearchSvg
            animate={{ x: searchOpen ? -215 : 0 }}
            transition={{ type: "tween" }}
            onClick={openSearch}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/motion.svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </SearchSvg>
          <SearchInput
            {...register("keyword", { required: true, minLength: 1 })}
            id="searchInput"
            animate={inputAnime}
            initial={{ scaleX: 0 }}
            transition={{ type: "tween" }}
            placeholder="영화, 시리즈"
          />
        </Search>
        <FaRegBell className="bellSvg" />
        <ProfileBox>
          <ProfileImg src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" />
          <ProfileArrow
            className="arrowSvg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </ProfileArrow>
          <ProfileModal className="ProfileModal">
            <IoMdArrowDropup className="upArrowSvg" />
            <ModalItem>
              <FaPencil />
              <span>프로필 관리</span>
            </ModalItem>
            <ModalItem>
              <IoPersonOutline />
              <span>프로필 이전</span>
            </ModalItem>
            <ModalItem>
              <RiChatSmileLine />
              <span>계정</span>
            </ModalItem>
            <ModalItem>
              <RiCustomerService2Fill />
              <span>고객 센터</span>
            </ModalItem>
            <Hr />
            <Span>넷플릭스에서 로그아웃</Span>
          </ProfileModal>
        </ProfileBox>
      </Column>
    </Nav>
  );
}

export default Header;
