import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchBarPropsType = {
  currentText?: string | null;
  setCurrentText: (currentText?: string) => void;
  updateSearchText: (currentText?: string) => void;
  addSearchHistory: (currentText?: string) => void;
};

function SearchBar({ currentText, setCurrentText, updateSearchText, addSearchHistory }: SearchBarPropsType) {
  const onChangeHandler = (inputValue: string) => {
    setCurrentText(inputValue);
  };

  const onClickHandler = () => {
    if (currentText !== null) {
      updateSearchText(currentText);
      addSearchHistory(currentText);
    }
  };

  const onKeyPressPreventHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  };

  return (
    <SearchContainer onSubmit={onKeyPressPreventHandler}>
      <InputField onKeyPress={onKeyPress} onChange={(e) => onChangeHandler(e.target.value)} type="text" name="search" required autoComplete="off" />
      <ButtonWrap onClick={() => onClickHandler()}>
        <FontAwesomeIcon icon={faSearch} />
      </ButtonWrap>
    </SearchContainer>
  );
}

const SearchContainer = styled.form`
  box-sizing: border-box;
  position: relative;
  width: 344px;
  height: 39px;
  /* display: flex;
align-items: center; */
`;

const InputField = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #ffffff;
  /* grey/line */
  border: 1px solid #e7e2e8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  padding: 0px 40px 0px 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 15px;
`;

export default SearchBar;
