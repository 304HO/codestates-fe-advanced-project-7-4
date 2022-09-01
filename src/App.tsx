import React, { useState, useEffect } from "react";
import "./App.css";
import routes, { RouteType } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";
import LightTheme from "./assets/theme/light";
import DarkTheme from "./assets/theme/dark";
import storage from "./common/utils/storage";
import Error404 from "./pages/Error404Page";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewsComponent from "./components/NewsComponent";

function App() {
  const [theme, setTheme] = useState(storage.getTheme());

  const getRoutes = (allRoutes: Array<RouteType>) =>
    allRoutes.map((route: RouteType) => {
      return (
        route.route && (
          <Route path={route.route} element={route.component} key={route.key} />
        )
      );
    });

  return (
    <>
      {/* <NewsComponent /> */}
      <ThemeProvider
        theme={{
          ...theme,
          setTheme: () => {
            storage.setTheme(theme.id);
            setTheme((theme) =>
              theme.id === "light" ? DarkTheme : LightTheme
            );
          },
        }}
      >
        <BrowserRouter>
          <Container>
            <ContentContainer>
              <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Error404 />} />
              </Routes>
            </ContentContainer>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  // calc(100% - header height)
  /* margin-left: 280px;
  margin-top: 64px; */
  height: calc(100% - 64px);
`;

export default App;
