import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import ArrowBottom from "./../assets/images/double-arrow-bottom-icon.svg";

function NewsComponent() {
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

  const timeHandler = () => {

  }

  return (

    <Container>
      <ButtonContainer>
        <button onClick={timeHandler}>정렬</button>
        <button onClick={timeHandler}>정렬</button>
      </ButtonContainer>

      {news?.map((el: any, i: any) => {
        return (
          <a href={el.url} target="_blank" key={i}>
            <News>
              <ImgWrapper>
                <Img src={el.urlToImage}></Img>
              </ImgWrapper>
              <ContentWrapper>
                <Title> {el.title}</Title>
                <DescWrapper>
                  <div>{!el.author ? "----" : el.author} </div>
                  <div> {el.publishedAt.substring(0, 10)}</div>
                </DescWrapper>
                <div>{el.description}</div>
              </ContentWrapper>
            </News>
          </a>
        );
      })}
      <StyledDivHidden ref={ref}></StyledDivHidden>
      <StyledArrowBottom>
        <img src={ArrowBottom} alt="ArrowBottom"></img>
      </StyledArrowBottom>
    </Container>
  );
}

export default NewsComponent;

const Container = styled.div`
display:flex;
flex-direction:column;


  a {
    text-decoration: none;
    color:black;
  }
`;

const ButtonContainer = styled.div`
display:flex;
justify-content:end;
margin:30px;
gap: 5px;
  button {
    width: 80px;
    height: 50px;
    background-color:#00E87B;
    border-radius: 20px;
  }
`
const News = styled.div`
  display: flex;
  text-decoration: none;
  align-items:center;
  margin: 30px;
  gap:20px;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px gray;
`;
const ImgWrapper = styled.div`
width: 200px;
height: 200px;
border-radius: 20px;
`
const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 20px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Title = styled.div`
font-size:2em;
`

const DescWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledDivHidden = styled.div`
  visibility: hidden;
`;

const moveDown = keyframes`
  from{
    transform: translateY(-20px);
  }
  to{
    transform: translateY(0px);
  }
`;

const StyledArrowBottom = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10px;
  animation: ${moveDown} 1s infinite linear;
`;
