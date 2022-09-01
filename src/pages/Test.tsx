import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal/Modal";
import { getNews } from "../features/newsActions";
import newsSlice, { clearNewsList, NewsType } from "../features/newsSlice";
import { userLogin } from "../features/userActions";
import { addBookmark, logout } from "../features/userSlice";
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
  const [sortedtype, setSortedtype] = useState<
    "relevancy" | "popularity" | "publishedAt"
  >("popularity");

  console.log(userState);
  console.log(newsState);
  const onClickLogoutHandler = () => {
    dispatch(userLogin({ id, password }));
    toggle();
  };
  const onClickLoginHandler = () => {
    dispatch(logout());
    toggle();
  };
  const onClickAddNewsHandler = async () => {
    await dispatch(getNews({ searchKeyword, pageSize, page }));
    setPage((prev) => prev + 1);
  };

  const onClickAddBookmarkHandler = async () => {
    dispatch(addBookmark(newsState.newsList[0]));
    setPage((prev) => prev + 1);
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
      <ButtonLogin onClick={onClickAddBookmarkHandler}>북마크</ButtonLogin>
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
      {userState.bookmarkList.map((v) => {
        return <div>{v.author}</div>;
      })}
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
