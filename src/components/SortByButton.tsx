import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

type SortByButtonPropsType = {
  name: string;
  sortByName: string;
  handler: (name: string) => void;
};

const SortByButton = ({ name, sortByName, handler }: SortByButtonPropsType) => {
  return (
    <StyledButton onClick={() => handler(name)}>
      {name}
      {sortByName === name ? (
        <StyledFontAwesomeIcon icon={faSortDown}></StyledFontAwesomeIcon>
      ) : (
        <StyledFontAwesomeIcon icon={faSortUp}></StyledFontAwesomeIcon>
      )}
    </StyledButton>
  );
};
export default SortByButton;

const StyledButton = styled.button`
  gap: 5px;
  width: 100px;
  height: 50px;
  background-color: #00e87b;
  border-radius: 15px;
  border: 0;
  font-weight: 700;
  display: flex;
  place-content: center;
  place-items: center;

  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #00e87b;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.15),
      inset 0px 4px 8px rgba(0, 0, 0, 0.15),
      inset 0px 8px 16px rgba(0, 0, 0, 0.15);
    transition: 0.2s;
    transform: translateY(2px);
  }

  & > svg {
    color: white;
    display: flex;
    place-content: center;
    place-items: center;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  display: flex;
  place-content: center;
`;
