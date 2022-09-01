import React, { useState, useEffect } from "react";
import "./App.css";
import routes, { RouteType } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import LightTheme from "./assets/theme/light";
import DarkTheme from "./assets/theme/dark";
import storage from "./common/utils/storage";
import Error404 from "./pages/Error404Page";

function App() {
  const [theme, setTheme] = useState(storage.getTheme());

  const getRoutes = (allRoutes: Array<RouteType>) =>
    allRoutes.map((route: RouteType) => {
      return route.route && <Route path={route.route} element={route.component} key={route.key} />;
    });

  const [data, setData] = useState(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash) {
      const accessToken = hash.split("=")[1].split("&")[0];
      console.log(accessToken);
      axios
        .get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken, {
          headers: {
            authorization: `token ${accessToken}`,
            accept: "application/json"
          }
        })
        .then((res) => {
          console.log("res", res);
          setData(res.data);
          // useNavigate("")
        })
        .catch((e) => console.log("oAuth token expired"));
    }
  }, []);

  return (
    <>
      <ThemeProvider
        theme={{
          ...theme,
          setTheme: () => {
            storage.setTheme(theme.id);
            setTheme((theme) => (theme.id === "light" ? DarkTheme : LightTheme));
          }
        }}>
        <BrowserRouter>
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
