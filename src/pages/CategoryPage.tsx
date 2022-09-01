import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function CategoryPage() {
  // TODO: 창 크기 줄어들면 defalt -> false;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <>
      <Header
        useLogo={true}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen && <Sidebar />}
    </>
  );
}

export default CategoryPage;
