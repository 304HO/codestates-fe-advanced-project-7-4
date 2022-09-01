import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsComponent from "../components/NewsComponent";

function CategoryPage() {
  // TODO: 창 크기 줄어들면 defalt -> false;
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

export default CategoryPage;

const StyledSpan = styled.div`
  margin-left: 280px;
  margin-top: 64px;
`;
