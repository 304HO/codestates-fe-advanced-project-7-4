import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import newsApi from "../apis/api/news";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { deleteBookmarkIndex } from "../features/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Background from "../components/Background";
import { toast } from "react-toastify";

function BookmarkPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const onClickDeleteBookmarkHandler = async (idx: number) => {
    dispatch(deleteBookmarkIndex(idx));
  };

  const clickHandler = (index: any) => {
    navigate(`/EditPage/${index}`);
  };

  useEffect(() => {
    if (userState.isLogin === false) {
      navigate("/");
      toast("로그인을 해주세요.");
    }
  }, []);

  return (
    <>
      <Background>
        <BookmarkContainer>
          {userState.bookmarkList.map((el: any, index: any) => {
            return (
              <>
                <BookmarkItemContainer key={el.url}>
                  <StyledDiv onClick={() => clickHandler(index)}>
                    <BookmarkImage src={el.urlToImage} />
                    <BookmarTitleContentContainer>
                      <BookmarkTitle>{el.title}</BookmarkTitle>
                      <div>{el.content}</div>
                    </BookmarTitleContentContainer>
                  </StyledDiv>
                  <StyledFontAwesomeIcon
                    icon={faXmark}
                    style={{ width: "25px", height: "25px" }}
                    onClick={() => onClickDeleteBookmarkHandler(index)}
                  />
                </BookmarkItemContainer>
              </>
            );
          })}
        </BookmarkContainer>
      </Background>
    </>
  );
}

export default BookmarkPage;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 930px) {
    flex-direction: column;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
`;

const BookmarkTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const BookmarTitleContentContainer = styled.div`
  /* border: 1px solid blue; */
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BookmarkImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 20px;
`;

const BookmarkItemContainer = styled.div`
  position: relative;
  padding: 30px;
  border: 1px solid gray;
  border-radius: 20px;
  margin: 10px 70px;
  display: flex;
  box-shadow: 4px 4px 4px 5px gray;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const BookmarkContainer = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
