import React, { useEffect } from "react";
import "../App.css";
import styled, { keyframes } from "styled-components";

const lodingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledDivCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 1rem 0 1rem 0;
`;

const StyledLoader = styled.div`
  background: ${(props) => props.theme.background};
  width: inherit;
  height: inherit;
  font-size: 0.2rem;
  border-top: 1rem solid rgba(255, 255, 255, 0.2);
  border-right: 1rem solid rgba(255, 255, 255, 0.2);
  border-bottom: 1rem solid rgba(255, 255, 255, 0.2);
  border-left: 1rem solid black;
  transform: translateZ(0);
  animation: ${lodingAnimation} 1s infinite linear;
  &,
  & :after {
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
  }
`;

const StyledLoadingFont = styled.span`
  margin-top: 3rem;
  font-size: 3rem;
`;

function Loading() {
  const [loadingPoing, setLoadingPoint] = React.useState<string>(".");
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPoint((prev) => {
        return ".".repeat((prev.length + 1) % 4);
      });
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StyledDivCenter>
      <StyledLoader></StyledLoader>
      <StyledLoadingFont>Loading{loadingPoing}</StyledLoadingFont>
    </StyledDivCenter>
  );
}

export default Loading;
