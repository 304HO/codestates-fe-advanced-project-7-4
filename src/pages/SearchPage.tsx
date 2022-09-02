import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsComponent from "../components/NewsComponent";

function SearchPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <>
      <Header
        useLogo={true}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen && <Sidebar />}
      <StyledDiv isSidebarOpen={isSidebarOpen}>
        <NewsComponent />
      </StyledDiv>
    </>
  );
}

export default SearchPage;

const StyledDiv = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  margin-left: ${(props) => (props.isSidebarOpen === true ? `280px` : `0px`)};
  margin-top: 64px;

  @media (max-width: 930px) {
    margin-left: 0px;
  }

  width: 100%;
  height: calc(100vh - 64px);
`;
