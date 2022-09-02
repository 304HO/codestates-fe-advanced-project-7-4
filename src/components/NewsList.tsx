import React, { useState } from "react";
import styled from "styled-components";
import { NewsType } from "../features/newsSlice";
import { addBookmark } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

type NewsListPropsType = {
  newsList: Array<NewsType>;
};

const NewsList = ({ newsList }: NewsListPropsType) => {
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState<number | null>(null);

  const onClickAddBookmarkHandler = async (idx: number) => {
    dispatch(addBookmark(newsList[idx]));
  };
  return (
    <>
      {newsList?.map((el: NewsType, i: number) => {
        return (
          <News>
            <StyledBookmark
              onMouseEnter={() => setIsFocus(i)}
              onMouseLeave={() => setIsFocus(null)}
              onClick={() => onClickAddBookmarkHandler(i)}
            >
              {isFocus === i ? (
                <FontAwesomeIcon icon={faSolidStar}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faRegularStar}></FontAwesomeIcon>
              )}
            </StyledBookmark>
            <StyledA
              href={el?.url ? el?.url : undefined}
              target="_blank"
              key={i}
              rel="noreferrer"
            >
              <ImgWrapper>
                {el?.urlToImage && <Img src={el.urlToImage}></Img>}
              </ImgWrapper>
              <ContentWrapper>
                <Title> {el.title}</Title>
                <DescWrapper>
                  <div>{!el.author ? "----" : el.author} </div>
                  {el.publishedAt && (
                    <div> {el.publishedAt.substring(0, 10)}</div>
                  )}
                </DescWrapper>
                <div>{el.description}</div>
              </ContentWrapper>
            </StyledA>
          </News>
        );
      })}
    </>
  );
};

export default NewsList;

const StyledBookmark = styled.div`
  z-index: 10;
  position: absolute;
  top: 10px;
  right: 10px;
  & :hover {
    cursor: pointer;
  }
`;

const News = styled.div`
  position: relative;
  /* display: flex;
  text-decoration: none;
  align-items: center; */
  margin: 30px;
  gap: 20px;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px gray;
`;

const StyledA = styled.a`
  display: flex;
  @media (max-width: 930px) {
    flex-direction: column;
  }
  text-decoration: none;
  align-items: center;
  margin: 30px;
  gap: 20px;
`;

const ImgWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
`;
const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 20px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Title = styled.div`
  font-size: 2em;
`;

const DescWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
