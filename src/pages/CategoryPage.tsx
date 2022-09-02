import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CategoryNewsComponent from "../components/CategoryNewsComponent";
import Background from "../components/Background";

function CategoryPage() {
  return (
    <div>
      <Background>
        <CategoryNewsComponent />
      </Background>
    </div>
  );
}

export default CategoryPage;
