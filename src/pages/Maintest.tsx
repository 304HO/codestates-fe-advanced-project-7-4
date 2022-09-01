import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import newsApi from "../apis/api/news";

function Maintest() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const setNewsData = async () => {
      const res = await axios.get(
        "https://newsapi.org/v2/everything?apiKey=4a002360bb714126a0ee4b0ea983c300&q=health"
      );
      setNews(res.data.articles);
      console.log("news", news);
    };
    setNewsData();
  }, []);

  const DataPasing = (e: any) => {
    JSON.parse(e);
    console.log(JSON.parse(e));
  };

  return (
    <BookmarkContainer>
      <div>Maintest</div>
      {news.map((data: any) => {
        return (
          <BookmarkItemContainer>
            <BookmarkTitle>
              {data.title}
              <button
                onClick={() => {
                  window.localStorage.setItem(data.url, JSON.stringify(data));
                }}
              >
                Bookmark
              </button>
              <button
                onClick={() => {
                  DataPasing(window.localStorage.getItem(data.url));
                }}
              >
                getItem
              </button>
            </BookmarkTitle>
            <BookmarkContent>{data.content}</BookmarkContent>
          </BookmarkItemContainer>
        );
      })}
    </BookmarkContainer>
  );
}

export default Maintest;

const BookmarkContent = styled.div`
  border: 1px solid gold;
`;

const BookmarkTitle = styled.div`
  border: 1px solid blue;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BookmarkItemContainer = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BookmarkContainer = styled.div`
  border: 1px solid red;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
