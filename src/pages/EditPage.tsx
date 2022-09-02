import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { NewsType } from "../features/newsSlice";
import Loading from "../components/Loading";
import { editBookmark } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  let { idx } = useParams();

  const [newsData, setNewsData] = useState<any | null>(null);

  const onClickHandler = () => {
    toast("수정되었습니다!");
    navigate("/BookmarkPage");
  };

  useEffect(() => {
    console.log(idx);
    if (userState.isLogin === false) {
      navigate("/");
      toast("로그인을 해주세요.");
    }
    if (idx !== undefined) {
      setNewsData({ ...userState.bookmarkList[parseInt(idx) as number] });
    }
  }, []);

  const handleSetValue = (value: string) => {
    setNewsData({ ...newsData, content: value });
  };

  const onClickEditBookmarkHandler = (news: NewsType) => {
    if (idx !== undefined) {
      dispatch(editBookmark({ idx: parseInt(idx), news }));
    }
  };

  if (newsData === null) {
    return <Loading></Loading>;
  }

  return (
    <RootContainer>
      <Title>{newsData.title}</Title>
      {newsData?.urlToImage && <ContentImg src={newsData.urlToImage} />}
      <Content>{newsData.content}</Content>
      <Textarea
        placeholder="여기서수정"
        value={newsData?.content ? newsData?.content : ""}
        onChange={(e) => handleSetValue(e.target.value)}
      ></Textarea>
      <StyledButton
        onClick={() => {
          onClickEditBookmarkHandler(newsData);
          onClickHandler();
        }}
      >
        수정버튼
      </StyledButton>
    </RootContainer>
  );
}

export default EditPage;

const ImageContent = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const RootContainer = styled.div`
  /* border: 1px solid red; */
  margin: 0 auto;
  max-width: 1000px;
  height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Title = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;

const ContentImg = styled.img`
  /* border: 3px solid green; */
  width: 700px;
  height: 700px;
`;

const Content = styled.div`
  /* border: 1px solid green; */
  font-size: 2em;
  width: 1000px;
`;

const Textarea = styled.textarea`
  width: 1000px;
  height: 100px;
  resize: none;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 30px;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: rgb(0, 232, 123);

  &:hover {
    box-shadow: 4px 4px 4px gray;
  }
`;
