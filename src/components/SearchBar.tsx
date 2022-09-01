import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import newsApi from "../apis/api/news";

function SearchBar() {
  const [currentText, setCurrentText] = React.useState<string | null>(null);
  const [searchText, setSearchText] = React.useState<string | null>(null);

  const onChangeHandler = (text: string) => {
    setCurrentText(text);
  };

  const onClickHandler = () => {
    setSearchText(currentText);
  };

  const onKeyPressPreventHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  React.useEffect(() => {
    const getNews = async () => {
      if (searchText !== null) {
        // const res = await newsApi.getOptionsNews({{searchText}});
        //? res => store에 담는 기능 추가
      }
    };
    getNews();
  }, [searchText]);

  return (
    <SearchContainer onSubmit={onKeyPressPreventHandler}>
      <InputField
        onKeyPress={onKeyPress}
        onChange={(e) => onChangeHandler(e.target.value)}
        type="text"
        name="search"
        required
        autoComplete="off"
      />
      <ButtonWrap onClick={() => onClickHandler()}>
        <FontAwesomeIcon icon={faSearch} />
      </ButtonWrap>
    </SearchContainer>
  );
}

const SearchContainer = styled.form`
  box-sizing: border-box;
  position: relative;
  width: 659px;
  height: 39px;
  margin-right: 80px;

  @media screen and (max-width: 1200px) {
    margin-right: 10px;
  }
`;

const InputField = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 2px solid #e7e2e8;
  box-shadow: 0px 3px 3px #e7e2e8;
  border-radius: 50px;
  padding: 0px 40px 0px 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  position: absolute;
  top: 12px;
  right: 20px;
`;

export default SearchBar;
