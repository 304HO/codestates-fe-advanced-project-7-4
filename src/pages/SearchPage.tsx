import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NewsComponent from "../components/NewsComponent";
import Background from "../components/Background";

function SearchPage() {
  return (
    <>
      <Background>
        <NewsComponent />
      </Background>
    </>
  );
}

export default SearchPage;
