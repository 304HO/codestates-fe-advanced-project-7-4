import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const MenuList = [
  { label: "즐겨찾기", param: "/BookmarkPage" },
  { label: "contour", param: "contour" },
  { label: "Business", param: "/CategoryPage/Business" },
  { label: "Entertainment", param: "/CategoryPage/Entertainment" },
  { label: "General", param: "/CategoryPage/General" },
  { label: "Health", param: "/CategoryPage/Health" },
  { label: "Science", param: "/CategoryPage/Science" },
  { label: "Sports", param: "/CategoryPage/Sports" },
  { label: "Technology", param: "/CategoryPage/Technology" },
];

function Sidebar() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentTapIdx, setCurrentTapIdx] = React.useState<number>(2);

  const onClickSidebarHandler = (param: string, idx: number) => {
    setCurrentTapIdx(idx);
    navigate(param);
  };

  React.useEffect(() => {
    console.log("param changed", category);
  }, [category]);

  return (
    <SidebarContainer>
      <MenuWrap>
        {MenuList.map((menu, idx) => {
          if (menu.label === "contour") {
            return <Hr key={idx} />;
          }
          return (
            <MenuText
              key={idx}
              className={currentTapIdx === idx ? "selected" : "unSelected"}
              onClick={() => onClickSidebarHandler(menu.param, idx)}
            >
              {menu.label}
            </MenuText>
          );
        })}
      </MenuWrap>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: 300px;
  height: calc(
    100% - 64px
  ); //--> sticky가 적용될 요소는 꼭 height값이 있어야 함
  position: absolute;
  top: 64px; //--> sticky 상단의 offset 0으로 부터 적용됨
  background-color: white;
`;

const MenuWrap = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 26px;
  gap: 16px;
  .selected {
    color: #00e87b;
  }
`;

const MenuText = styled.li`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: default;
  user-select: none;

  &:hover {
    transition-duration: 200ms;
    color: #00e87b;
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 0;
  height: 0;
  border-top: 1px solid #8c8c8c;
`;

export default Sidebar;