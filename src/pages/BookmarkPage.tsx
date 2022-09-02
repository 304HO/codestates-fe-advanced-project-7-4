import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import newsApi from "../apis/api/news";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";

function BookmarkPage() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const [bookmarkData, setBookmarkData] = useState<any | null>([]);

  const Dataparse = (Value: any) => {
    const parsedata = JSON.parse(Value);
    setBookmarkData((prev: any) => {
      return [...prev, parsedata];
    });
    console.log("Dataparse JSON.parse", JSON.parse(Value));
    console.log(bookmarkData);
  };

  const clickHandler = (index: any) => {
    navigate(`/EditPage/${index}`);
  };

  useEffect(() => {
    const keys = Object.keys(localStorage);
    console.log("keys", keys);
    for (let key of keys) {
      Dataparse(localStorage.getItem(key));
    }
  }, []);

  return (
    <BookmarkContainer>
      <div>My Bookmark Page</div>
      {userState.bookmarkList.map((el: any, index: any) => {
        return (
          <BookmarkItemContainer
            key={el.url}
            onClick={() => clickHandler(index)}
          >
            <BookmarkImage src={el.urlToImage} />
            <BookmarTitleContentContainer>
              <BookmarkTitle>{el.title}</BookmarkTitle>
              <div>{el.content}</div>
            </BookmarTitleContentContainer>
          </BookmarkItemContainer>
        );
      })}
    </BookmarkContainer>
  );
}

export default BookmarkPage;
const BookmarkContent = styled.div``;

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
