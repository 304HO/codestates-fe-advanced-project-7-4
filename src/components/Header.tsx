import React from "react";
import "../App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "./../hooks/storeHooks";
import logo from "./../assets/images/Logo.png";
import { logout } from "../features/userSlice";
import SearchBar from "./SearchBar";
import ButtonLogin from "./ButtonLogin";

type HeaderPropsType = {
  children?: React.ReactElement | string;
  useLogo?: boolean;
  useLogout?: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: any | null;
};

function Header({
  children,
  useLogo = false,
  useLogout = false,

  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderPropsType) {
  const navigate = useNavigate();

  const onClickLogoHandler = () => {
    navigate("/CategoryPage/Business");
  };

  const onClickHamburgerHandler = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <StyledHeader>
      <StyledDiv>
        <StyledFontAwesomeIcon
          icon={faBars}
          onClick={() => onClickHamburgerHandler()}
        />
        {useLogo === true && (
          <StyledLogo
            onClick={onClickLogoHandler}
            src={logo}
            alt={"alyce"}
          ></StyledLogo>
        )}
      </StyledDiv>
      <SearchBar />
      <ButtonLogin />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  z-index: 10;

  /* width: calc(100% - 40px); */
  width: 100%;
  height: 64px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;

  align-items: center;
  transition-duration: 0.8s;
  box-shadow: 0 1px 2px #cdcacf;
  background: white;
`;

const StyledLogo = styled.img`
  height: 25px;
  user-select: none;
  margin: 0px 20px 0px 0px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  padding: 5px;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
