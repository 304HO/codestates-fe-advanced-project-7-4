import React from "react";
import styled from "styled-components";
import { NewsType } from "../features/newsSlice";
import noImage from "../assets/images/no_image.png";

const NewsContent = ({ newsContent }: { newsContent: NewsType }) => {
  const onErrorImg: React.ReactEventHandler<HTMLImageElement> = (e: any) => {
    e.target.src = noImage;
  };

  return (
    <StyledA
      href={newsContent?.url ? newsContent?.url : undefined}
      target="_blank"
      rel="noreferrer"
    >
      <ImgWrapper>
        {newsContent?.urlToImage && (
          <Img src={newsContent?.urlToImage} onError={onErrorImg}></Img>
        )}
      </ImgWrapper>
      <ContentWrapper>
        <Title> {newsContent.title}</Title>
        <AuthorTimeWrapper>
          <div>{!newsContent.author ? "----" : newsContent.author} </div>
          {newsContent.publishedAt && (
            <div> {newsContent.publishedAt.substring(0, 10)}</div>
          )}
        </AuthorTimeWrapper>
        <DescWrapper>{newsContent.content}</DescWrapper>
      </ContentWrapper>
    </StyledA>
  );
};
export default NewsContent;

const StyledA = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  /* margin: 30px; */
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const ImgWrapper = styled.div`
  width: 90%;
  height: 200px;
  border-radius: 20px;
  /* object-fit: cover; */
`;
const Img = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-weight: 500;
`;

const AuthorTimeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const DescWrapper = styled.div`
  /* display: flex; */
  /* gap: 10px; */
  width: 100%;
  height: 7.1em;
  display: block;
  overflow: hidden;
  /* white-space: pre-line; */
`;
