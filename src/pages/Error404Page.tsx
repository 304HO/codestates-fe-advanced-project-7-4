import React from "react";
import "../App.css";
import styled from "styled-components";
import Background from "../components/Background";

function Error404() {
  return (
    <Background>
      <Styled404>
        <h2>Oops!</h2>
        <h1>404</h1>
        <h3>We couldn't find that page.</h3>
      </Styled404>
    </Background>
  );
}
export default Error404;

const Styled404 = styled.div`
  display: flex;
  min-height: 200px;
  flex-direction: column;
  align-items: center;
  margin: 1em;
  padding: 1em;
  border-radius: 1em;
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  font-size: 30px;
  font-family: "Alumni Sans Collegiate One";
  box-shadow: ${(props) =>
    `inset 6px 6px 10px 0 ${props.theme.primaryColor}, inset -6px -6px 10px 0 ${props.theme.secondaryColor}`};
  background: ${(props) =>
    `linear-gradient(135deg, ${props.theme.primaryColor}, ${props.theme.secondaryColor});`};
  transition-duration: 0.2s;
  & > h1 {
    font-size: 50px;
    color: red;
  }
  & > * {
    padding-bottom: 0.5em;
  }
`;
