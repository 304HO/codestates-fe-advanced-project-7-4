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

  return (
    <>
      <Header
        useLogo={true}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {isSidebarOpen && <Sidebar />}
      <StyledDiv isSidebarOpen={isSidebarOpen}>
        <BookmarkContainer>
          <div>My Bookmark Page</div>
          {userState.bookmarkList.map((el: any, index: any) => {
            return (
              <>
                <BookmarkItemContainer key={el.url}>
                  <div onClick={() => clickHandler(index)}>
                    <BookmarkImage src={el.urlToImage} />
                    <BookmarTitleContentContainer>
                      <BookmarkTitle>{el.title}</BookmarkTitle>
                      <div>{el.content}</div>
                    </BookmarTitleContentContainer>
                  </div>
                  <StyledFontAwesomeIcon
                    icon={faXmark}
                    onClick={() => onClickDeleteBookmarkHandler(index)}
                  />
                </BookmarkItemContainer>
              </>
            );
          })}
        </BookmarkContainer>
      </StyledDiv>
    </>
  );
}

export default BookmarkPage;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
`;

const BottomButton = styled.div`
  /* border: 1px solid red; */
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  width: 700px;
  border-radius: 20px;
  margin: 10px 70px;
  display: flex;
  box-shadow: 4px 4px 4px 5px gray;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const BookmarkContainer = styled.div`
  /* border: 1px solid red; */
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StyledDiv = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  margin-left: ${(props) => (props.isSidebarOpen === true ? `280px` : `0px`)};
  margin-top: 64px;

  @media (max-width: 930px) {
    margin-left: 0px;
  }

  width: 100%;
  height: calc(100vh - 64px);
`;
