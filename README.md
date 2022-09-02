# codestates-fe-advanced-project-7-4

# [Deploy Site](https://codestates-fe-advanced-project-7-4.vercel.app/)

## 7조 팀원구성

- 채희찬(팀장)
- 김민성
- 장석찬
- 제경모

<br/>

## Figma

<details>
    <summary>Figma Image</summary>

    ![로그인 페이지](https://user-images.githubusercontent.com/91649767/188101040-58151631-54b3-4451-8f2b-4b840cc1128f.png)

    ![Main page](https://user-images.githubusercontent.com/91649767/188101080-e58f60b5-1a26-4adb-a832-6e5ef9b6b8f5.png)
    
    ![news page](https://user-images.githubusercontent.com/91649767/188101184-1b18a308-ad3a-441c-9400-ad67d8d8a720.png)

    ![수정 page](https://user-images.githubusercontent.com/91649767/188101140-4e94ae20-de9d-4d93-9029-ee4aa8014b2e.png)

</details>
<br/>

## page

1. 즐겨찾기 - 제경모
2. Redux, api사용 로직 - 장석찬
3. 뉴스목록 - 채희찬
4. 헤더, 사이드바 - 김민성

<br/>

## 프로젝트 실행 방법

```
git clone git@github.com:304HO/codestates-fe-advanced-project-7-4.git
cd codestates-fe-advanced-project-7-4
npm install
npm start
```

## 구현

- [x] 테스트 계정으로만 로그인이 가능합니다.

- [x] 웹페이지 재접속시에도 로그인 상태는 유지되어야 합니다.

- [x] 로그인 상태에서 즐겨찾기 페이지에서, 사용자가 특정 기사 편집 버튼을 클릭하면 내용을 수정하고 저장할 수 있습니다.

- [x] 사용자가 검색어를 입력하면, News API를 이용해 기사를 검색하고, 결과를 보여 줍니다.

- [x] 정렬 방식은 작성 날짜 혹은 출처를 기준으로 합니다.

- [x] 페이지네이션 구현 방식: 무한 스크롤

- [x] 기사 클릭시, 새로운 탭을 열어 해당 페이지로 이동합니다.

- [x] React Hook, styled-components, Redux 사용

      <br/>
      <br/>

## 아쉬운 점

- [ ] client상태관리에 react query와 같은 것을 사용하면 더 좋은데 러닝커브를 만족할 시간이 주어지지 않아서 아쉽습니다.
