import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import ArrowBottom from "./../assets/images/double-arrow-bottom-icon.svg";
import { clearCategoryNewsList, clearNewsList } from "../features/newsSlice";
import { getCategoryNews, getNews } from "../features/newsActions";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useLocation, useParams } from "react-router-dom";
import { CategoryType } from "../apis/api/news";
import Loading from "./Loading";
import NewsList from "./NewsList";

function NewsComponent() {
  const dispatch = useAppDispatch();
  const newsState = useAppSelector((state) => state.news);
  const [sortBy, setSortBy] = useState<any>(null);
  let { search } = useLocation();
  let query = search
    .replace("?", "")
    .split("&")
    .map((v) => v.split("="));

  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      onClickAddNewsHandler();
    }
  }, [inView]);

  const sortedtypeHandler = (sortBy: string) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    console.log("up");
    dispatch(clearNewsList());
    setPage(1);
  }, [search, sortBy]);

  useEffect(() => {
    console.log("down");
    onClickAddNewsHandler();
  }, [search]);

  const onClickAddNewsHandler = async () => {
    for (let [key, value] of query) {
      if (key === "searchKeyword") {
        await dispatch(
          getNews({
            searchKeyword: value,
            sortBy,
            pageSize,
            page,
          })
        );
        setPage((prev) => prev + 1);
        return;
      }
    }
  };

  if (newsState.newsList.length === 0) {
    return (
      <StyledLoadingContainer>
        <Loading></Loading>
      </StyledLoadingContainer>
    );
  }

  return (
    <Container>
      <ButtonContainer>
        <button onClick={() => sortedtypeHandler("relevancy")}>
          relevancy
        </button>
        <button onClick={() => sortedtypeHandler("popularity")}>
          popularity
        </button>
        <button onClick={() => sortedtypeHandler("publishedAt")}>
          publishedAt
        </button>
      </ButtonContainer>
      <NewsList newsList={newsState.newsList}></NewsList>
      <StyledDivHidden ref={ref}></StyledDivHidden>
      <StyledArrowBottom>
        <img src={ArrowBottom} alt="ArrowBottom"></img>
      </StyledArrowBottom>
    </Container>
  );
}

export default NewsComponent;

const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 300px);

  a {
    text-decoration: none;
    color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin: 30px;
  gap: 5px;
  button {
    width: 80px;
    height: 50px;
    background-color: #00e87b;
    border-radius: 20px;
  }
`;

const StyledDivHidden = styled.div`
  visibility: hidden;
`;

const moveDown = keyframes`
  from{
    transform: translateY(-20px);
  }
  to{
    transform: translateY(0px);
  }
`;

const StyledArrowBottom = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10px;
  animation: ${moveDown} 1s infinite linear;
`;
