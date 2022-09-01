import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import newsApi from "../apis/api/news";

function BookmarkPage() {
  const [bookmarkData, setBookmarkData] = useState<any | null>([]);

  const Dataparse = (Value: any) => {
    const parsedata = JSON.parse(Value);
    setBookmarkData((prev: any) => {
      return [...prev, parsedata];
    });
    console.log("Dataparse JSON.parse", JSON.parse(Value));
    console.log(bookmarkData);
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
      {bookmarkData.map((el: any) => {
        return (
          <>
            <div>{el.title}</div>
            <img src={el.urlToImage}></img>
            <div>{el.content}</div>
          </>
        );
      })}
    </BookmarkContainer>
  );
}

export default BookmarkPage;

const BookmarkContainer = styled.div`
  border: 1px solid red;
  max-width: 100%;
`;
