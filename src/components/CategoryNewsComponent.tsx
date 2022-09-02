import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import ArrowBottom from "./../assets/images/double-arrow-bottom-icon.svg";
import { clearCategoryNewsList, clearNewsList } from "../features/newsSlice";
import { getCategoryNews } from "../features/newsActions";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { useParams } from "react-router-dom";
import { CategoryType } from "../apis/api/news";
import NewsList from "./NewsList";

function CategoryNewsComponent() {
  const dispatch = useAppDispatch();
  const newsState = useAppSelector((state) => state.news);
  const { category } = useParams();
  const [page, setPage] = useState<number>(1);
  const pageSize = 5;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      onClickAddCategoryNewsHandler();
    }
  }, [inView]);

  const timeHandler = () => {};

  useEffect(() => {
    dispatch(clearCategoryNewsList());
    setPage(1);
  }, [category]);

  const onClickAddCategoryNewsHandler = async () => {
    const checkSet = new Set([
      "Business",
      "Entertainment",
      "General",
      "Health",
      "Science",
      "Sports",
      "Technology",
    ]);
    if (category === undefined) return;
    if (checkSet.has(category)) {
      await dispatch(
        getCategoryNews({
          category,
          pageSize,
          page,
        })
      );
    }
    setPage((prev) => prev + 1);
  };

  return (
    <Container>
      <NewsList newsList={newsState.categoryNewsList}></NewsList>
      <StyledDivHidden ref={ref}></StyledDivHidden>
      <StyledArrowBottom>
        <img src={ArrowBottom} alt="ArrowBottom"></img>
      </StyledArrowBottom>
    </Container>
  );
}

export default CategoryNewsComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: black;
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
