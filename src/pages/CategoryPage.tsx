import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CategoryNewsComponent from "../components/CategoryNewsComponent";

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
        <CategoryNewsComponent />
      </StyledSpan>
    </div>
  );
}

export default CategoryPage;

const StyledSpan = styled.div`
  // isSidebarOpen === true => margin-left: 0px;

  margin-left: 280px;
  margin-top: 64px;
`;
