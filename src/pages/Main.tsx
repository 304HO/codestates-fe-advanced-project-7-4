import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/CategoryPage/Business");
  }, []);
  return <></>;
};
export default Main;
