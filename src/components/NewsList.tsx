import React, { useState } from "react";
import styled from "styled-components";
import { NewsType } from "../features/newsSlice";
import { addBookmark, deleteBookmarkIndex } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import NewsContent from "./NewsContent";
import { changeUrl } from "./../common/utils/parseUrl";

type NewsListPropsType = {
  newsList: Array<NewsType>;
};

const NewsList = ({ newsList }: NewsListPropsType) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const bookMarkList = userState.bookmarkList;
  const [isFocus, setIsFocus] = useState<number | null>(null);

  const onClickAddBookmarkHandler = async (
    idx: number,
    isInBookMarkList: boolean,
  ) => {
    if (newsList[idx].url !== undefined || newsList[idx].url !== null) {
      if (isInBookMarkList === true) {
        toast.success("즐겨찾기에 삭제되었습니다.");
        dispatch(deleteBookmarkIndex(newsList[idx].url as string));
      } else {
        toast.success("즐겨찾기에 추가되었습니다.");
        dispatch(addBookmark(newsList[idx]));
      }
    } else {
      toast.error("url이 없습니다.");
    }
  };

  return (
    <StyledContainer>
      {newsList?.map((newsContent: NewsType, i: number) => {
        const isInBookMarkList = bookMarkList.hasOwnProperty(
          changeUrl(newsContent.url as string),
        );
        return (
          <News key={i}>
            <StyledBookmark
              onClick={() => onClickAddBookmarkHandler(i, isInBookMarkList)}
            >
              {isInBookMarkList ? (
                <FontAwesomeIcon icon={faSolidStar}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faRegularStar}></FontAwesomeIcon>
              )}
            </StyledBookmark>
            <NewsContent newsContent={newsContent} />
          </News>
        );
      })}
    </StyledContainer>
  );
};

export default NewsList;

const StyledBookmark = styled.div`
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  & :hover {
    cursor: pointer;
  }
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 550px;
`;

const News = styled.div`
  position: relative;
  margin: 30px;
  gap: 20px;
  border: 1px solid;
  border-radius: 12px;
  border-color: rgba(100, 100, 100, 0.4);
  background-color: white;
`;

const StyledA = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  margin: 30px;
  gap: 20px;
`;

const ImgWrapper = styled.div`
  width: 97%;
  height: 200px;
  border-radius: 20px;
  /* object-fit: cover; */
`;
const Img = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-weight: 500;
`;

const AuthorTimeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const DescWrapper = styled.div`
  /* display: flex; */
  /* gap: 10px; */
  height: 7.1em;
  overflow: hidden;
  display: block;
  white-space: pre-line;
`;
