import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import { getCategoryNews, getNews } from "../features/newsActions";
import newsSlice, { clearNewsList, NewsType } from "../features/newsSlice";
import { userLogin } from "../features/userActions";
import {
  addBookmark,
  deleteBookmarkIndex,
  editBookmark,
  logout,
} from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import useModal from "../hooks/useModal";

function Test() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const newsState = useAppSelector((state) => state.news);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isOpen, toggle } = useModal();

  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "relevancy" | "popularity" | "publishedAt"
  >("popularity");

  const onClickLogoutHandler = () => {
    dispatch(userLogin({ id, password }));
    toggle();
  };
  const onClickLoginHandler = () => {
    dispatch(logout());
    toggle();
  };
  const onClickAddNewsHandler = async () => {
    await dispatch(getNews({ searchKeyword, sortBy, pageSize, page }));
    setPage((prev) => prev + 1);
  };
  const onClickAddCategoryNewsHandler = async () => {
    await dispatch(
      getCategoryNews({
        category: "business",
        pageSize,
        page,
      })
    );
    setPage((prev) => prev + 1);
  };

  const onClickAddBookmarkHandler = async (idx: number) => {
    dispatch(addBookmark(newsState.newsList[idx]));
  };

  const onClickDeleteBookmarkHandler = async (idx: number) => {
    dispatch(deleteBookmarkIndex(idx));
  };

  const onClickEditBookmarkHandler = (idx: number, news: NewsType) => {
    const newNews = { ...news };
    newNews.author = "test";
    dispatch(editBookmark({ idx, news: newNews }));
  };

  useEffect(() => {
    dispatch(clearNewsList());
    return () => {};
  }, []);

  return (
    <Container>
      <ButtonLogin onClick={toggle}>모달 창</ButtonLogin>
      <Input
        placeholder={"searchKeyword"}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      ></Input>
      <ButtonLogin onClick={onClickAddNewsHandler}>뉴스 추가</ButtonLogin>
      <></>
      <ButtonLogin onClick={onClickAddCategoryNewsHandler}>
        카테고리 뉴스 추가
      </ButtonLogin>
      <Modal open={isOpen} onClose={toggle}>
        <>
          <Input
            placeholder={"id"}
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></Input>
          <Input
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <ButtonLogin onClick={onClickLogoutHandler}>로그인 버튼</ButtonLogin>
          <ButtonLogin onClick={onClickLoginHandler}>로그아웃 버튼</ButtonLogin>
        </>
      </Modal>
      {userState.bookmarkList.map((v, idx) => {
        return (
          <div>
            {v?.author}
            <ButtonLogin onClick={() => onClickDeleteBookmarkHandler(idx)}>
              북마크 삭제
            </ButtonLogin>
            <ButtonLogin onClick={() => onClickEditBookmarkHandler(idx, v)}>
              제목 수정
            </ButtonLogin>
          </div>
        );
      })}
      {newsState.categoryNewsList.map((v, idx) => {
        return (
          <div>
            <span>인덱스{idx}</span>
            <span>{v?.author}</span>
          </div>
        );
      })}
      <div>
        {newsState.newsList.map((v, idx) => {
          return (
            <div>
              <span>인덱스{idx}</span>
              <span>{v?.author}</span>
              <ButtonLogin onClick={() => onClickAddBookmarkHandler(idx)}>
                북마크 추가
              </ButtonLogin>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default Test;

const Container = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0;
  padding: 0px 20px 0px 20px;
`;
const ButtonLogin = styled.button`
  width: 340px;
  height: 50px;
  border: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgb(255, 83, 85);
  color: white;
`;
