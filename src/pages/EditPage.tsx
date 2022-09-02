import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { NewsType } from "../features/newsSlice";
import Loading from "../components/Loading";
import { editBookmark } from "../features/userSlice";

function EditPage() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  let { idx } = useParams();

  const [newsData, setNewsData] = useState<any | null>(null);

  useEffect(() => {
    console.log(idx);
    if (idx !== undefined) {
      setNewsData({ ...userState.bookmarkList[parseInt(idx) as number] });
    }
  }, []);

  const handleSetValue = (value: string) => {
    setNewsData({ ...newsData, content: value });
  };

  // const onClickEditBookmarkHandler = (idx: number, news: NewsType) => {
  //   // console.log(idx, news);
  //   const newNews = { ...news };
  //   newNews.author = "test";
  //   dispatch(editBookmark({ idx, news: newNews }));
  // };

  if (newsData === null) {
    return <Loading></Loading>;
  }

  return (
    <RootContainer>
      <Title>{newsData.title}</Title>
      {newsData?.urlToImage && (
        <ContentImg>
          <img src={newsData.urlToImage} />
        </ContentImg>
      )}
      <Content>{newsData.content}</Content>

      <textarea
        placeholder="여기서수정"
        value={newsData?.content ? newsData?.content : ""}
        onChange={(e) => handleSetValue(e.target.value)}
      ></textarea>
      {/* <button onClick={onClickEditBookmarkHandler}</button> */}
    </RootContainer>
  );
}

export default EditPage;

const RootContainer = styled.div``;

const Title = styled.div``;

const ContentImg = styled.div``;

const Content = styled.div``;
