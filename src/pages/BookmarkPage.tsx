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
import NoBookMark from "../assets/images/no_bookmark.svg";
import NewsContent from "../components/NewsContent";
import { NewsType } from "../features/newsSlice";

function BookmarkPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const onClickDeleteBookmarkHandler = async (url: string) => {
    dispatch(deleteBookmarkIndex(url));
  };

  const clickHandler = (url: string) => {
    navigate(`/EditPage/${url}`);
  };

  useEffect(() => {
    if (userState.isLogin === false) {
      navigate("/");
      toast.error("로그인을 해주세요.");
    }
  }, []);

  return (
    <>
      <Background>
        <BookmarkContainer>
          {Object.keys(userState.bookmarkList).length === 0 && (
            <img src={NoBookMark}></img>
          )}
          {Object.entries(userState.bookmarkList).map(
            ([url, el]: [url: string, el: NewsType]) => {
              return (
                <BookmarkItemContainer key={url}>
                  <StyledDiv
                    onClick={(e) => {
                      e.preventDefault();
                      clickHandler(url);
                    }}
                  >
                    <StyledFontAwesomeIcon
                      icon={faXmark}
                      style={{ width: "20px", height: "20px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDeleteBookmarkHandler(url);
                      }}
                    />
                    <NewsContent newsContent={el} />
                  </StyledDiv>
                </BookmarkItemContainer>
              );
            },
          )}
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
  height: 100%;
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

const BookmarkImgWrapper = styled.div`
  width: 97%;
  height: 200px;
  border-radius: 20px;
  /* object-fit: cover; */
`;

const BookmarkImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
`;

const BookmarkItemContainer = styled.div`
  position: relative;
  /* display: flex;
  text-decoration: none;
  align-items: center; */
  margin: 30px;
  gap: 20px;
  border: 1px solid;
  border-radius: 12px;
  border-color: rgba(100, 100, 100, 0.4);
  background-color: white;
  white-space: pre-line;
  word-break: break-word;
`;

const BookmarkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: 550px;
  a {
    text-decoration: none;
    color: black;
  }
`;
