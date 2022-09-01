import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
// import ArrowBottom from "./../../assets/images/double-arrow-bottom-icon.svg";

export default function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [news, setNews] = useState<Array<any>>([]);
  const [pageSize, setPageSize] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNews();
    }
  }, [inView]);

  const fetchNews = async () => {
    setIsLoaded(true);
    await axios
      .get(
        `https://newsapi.org/v2/everything?apiKey=9414eabebe814e2b871205bce51d7c64&q=health&pageSize=${pageSize}&page=${page}`
      )
      .then((res: any) => {
        setNews((prev: any) => [...prev, ...res.data.articles]);
        setPage(page + 1);
        console.log(res.data.articles);
      });
    setIsLoaded(false);
  };

  return (
    <Container>
      {news?.map((el: any, i: any) => {
        return (
          <a href={el.url} target="_blank" key={i}>
            <News>
              <div>
                <Img src={el.urlToImage}></Img>
              </div>
              <ContentWrapper>
                <div>제목: {el.title}</div>
                <DescWrapper>
                  <div>저자: {el.author} </div>
                  <div>시간: {el.publishedAt}</div>
                </DescWrapper>
                <div>요약: {el.description}</div>
              </ContentWrapper>
            </News>
          </a>
        );
      })}
      <StyledDivHidden ref={ref}></StyledDivHidden>
      {/* <StyledArrowBottom>
        <img src={ArrowBottom} alt="ArrowBottom"></img>
      </StyledArrowBottom> */}
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid red;
  width: 500px;
  height: 500px;
  overflow: hidden;
`;
const News = styled.div`
  display: flex;
  text-decoration: none;
  margin: 50px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DescWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledDivHidden = styled.div`
  visibility: hidden;
`;

// const moveDown = keyframes`
//   from{
//     transform: translateY(-20px);
//   }
//   to{
//     transform: translateY(0px);
//   }
// `;

// const StyledArrowBottom = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   height: 10px;
//   animation: ${moveDown} 1s infinite linear;
// `;
