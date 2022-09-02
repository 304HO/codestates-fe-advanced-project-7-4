import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsComponent from "../components/NewsComponent";

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
      {isSidebarOpen && <Sidebar />}
      <StyledDiv isSidebarOpen={isSidebarOpen}>{children}</StyledDiv>
    </>
  );
}

export default Background;

const StyledDiv = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  padding-left: ${(props) => (props.isSidebarOpen === true ? `280px` : `0px`)};
  margin-top: 64px;
  & > div {
    width: ${(props) =>
      props.isSidebarOpen === true ? `calc(100vw - 280px)` : `100vw`};
  }

  @media (max-width: 930px) {
    padding-left: 0px;
    width: 100vw;
    & > div {
      width: 100vw;
    }
  }

  height: calc(100vh - 64px);
`;
