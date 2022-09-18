import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsComponent from "../components/NewsComponent";
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

type BackgroundPropsType = {
  children: React.ReactElement;
};

function Background({ children }: BackgroundPropsType) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <>
      <Header
        useLogo={true}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {/* {isSidebarOpen && <Sidebar />} */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <StyledDiv isSidebarOpen={isSidebarOpen}>{children}</StyledDiv>
    </>
  );
}

export default Background;

const StyledDiv = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  transition-duration: 0.2s;
  margin-top: 64px;

  padding-left: ${(props) => (props.isSidebarOpen === true ? `280px` : `0px`)};
  width: ${(props) =>
    props.isSidebarOpen === true ? `calc(100% - 280px)` : `100%`};
  & > div {
    width: ${(props) =>
      props.isSidebarOpen === true ? `calc(100% - 280px)` : `100%`};
  }

  @media (max-width: 930px) {
    padding-left: 0px;
    width: 100%;
    & > div {
      width: 100%;
    }
  }
`;
