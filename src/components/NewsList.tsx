import React from "react";
import styled from "styled-components";
import { NewsType } from "../features/newsSlice";
import { addBookmark } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";

type NewsListPropsType = {
  newsList: Array<NewsType>;
};

const NewsList = ({ newsList }: NewsListPropsType) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  console.log(userState.bookmarkList);

  const onClickAddBookmarkHandler = async (idx: number) => {
    dispatch(addBookmark(newsList[idx]));
  };
  return (
    <>
      {newsList?.map((el: NewsType, i: number) => {
        return (
          <News>
            <StyledBookmark onClick={() => onClickAddBookmarkHandler(i)}>
              북마크
            </StyledBookmark>
            <a
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
            </a>
          </News>
        );
      })}
    </>
  );
};

export default NewsList;

const StyledBookmark = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  background-color: blue;
`;

const News = styled.div`
  position: relative;
  display: flex;
  text-decoration: none;
  align-items: center;
  margin: 30px;
  gap: 20px;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px gray;
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
