import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

import { FaTwitter } from "react-icons/fa";

const Wrapper = styled.div`
  position: relative;
  left: 18%;
  color: rgb(117, 117, 117);
  margin-bottom: 15px;
`;
const IconBox = styled.div`
  display: flex;
  margin-right: 20px;
  margin-bottom: 20px;
  svg {
    cursor: pointer;
    font-size: 23px;
    margin-right: 20px;
    color: white;
  }
`;
const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 170px;
  grid-row-gap: 18px;
`;
const NavItem = styled.span`
  cursor: pointer;
  font-size: 13px;
`;
const ServiceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 35px;
  border: 1px solid rgb(117, 117, 117);
  font-size: 13px;
  margin-top: 30px;
  margin-bottom: 25px;
  cursor: pointer;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
const SiteInfo = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
`;

function Footer() {
  return (
    <Wrapper>
      <IconBox>
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </IconBox>
      <Nav>
        <NavItem>화면 해설</NavItem>
        <NavItem>고객 센터</NavItem>
        <NavItem>기프트카드</NavItem>
        <NavItem>미디어 센터</NavItem>
        <NavItem>투자 정보(IR)</NavItem>
        <NavItem>입사 정보</NavItem>
        <NavItem>이용 약관</NavItem>
        <NavItem>개인정보</NavItem>
        <NavItem>법적 고지</NavItem>
        <NavItem>쿠키 설정</NavItem>
        <NavItem>회사 정보</NavItem>
        <NavItem>문의하기</NavItem>
      </Nav>
      <ServiceBox>서비스 코드</ServiceBox>
      <Box>
        <SiteInfo>넷플릭스클론코리아 화이팅: 12341234</SiteInfo>
        <SiteInfo>대표: 신승준</SiteInfo>
        <SiteInfo>사업자등록번호: 111111111</SiteInfo>
        <SiteInfo>클라우드 호스팅: alalalal</SiteInfo>
        <SiteInfo>공정거래위원회 웹사이트X</SiteInfo>
      </Box>
    </Wrapper>
  );
}

export default Footer;
