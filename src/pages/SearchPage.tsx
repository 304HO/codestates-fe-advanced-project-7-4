import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsComponent from "../components/NewsComponent";

function SearchPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <div>
      <Header
        useLogo={true}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen && <Sidebar />}
      <StyledSpan>
        <NewsComponent />
      </StyledSpan>
    </div>
  );
}

export default SearchPage;

const StyledSpan = styled.div`
  margin-left: 280px;
  margin-top: 64px;
`;
