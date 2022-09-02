import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/storeHooks";
import { clearCategoryNewsList } from "../features/newsSlice";

const MenuList = [
  { label: "즐겨찾기", value: "BookmarkPage", param: "/BookmarkPage" },
  { label: "contour", value: "contour", param: "contour" },
  { label: "Business", value: "Business", param: "/CategoryPage/Business" },
  {
    label: "Entertainment",
    value: "Entertainment",
    param: "/CategoryPage/Entertainment",
  },
  { label: "General", value: "General", param: "/CategoryPage/General" },
  { label: "Health", value: "Health", param: "/CategoryPage/Health" },
  { label: "Science", value: "Science", param: "/CategoryPage/Science" },
  { label: "Sports", value: "Sports", param: "/CategoryPage/Sports" },
  {
    label: "Technology",
    value: "Technology",
    param: "/CategoryPage/Technology",
  },
];

function Sidebar() {
  const { category } = useParams();
  const navigate = useNavigate();

  const onClickSidebarHandler = (param: string) => {
    navigate(param);
  };

  return (
    <SidebarContainer>
      <MenuWrap>
        {MenuList.map((menu, idx) => {
          if (menu.value === "contour") {
            return <Hr key={idx} />;
          }
          return (
            <MenuText
              key={idx}
              className={category === menu.value ? "selected" : "unSelected"}
              onClick={() => onClickSidebarHandler(menu.param)}
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
  height: calc(100% - 64px);
  position: fixed;
  top: 64px;
  background-color: white;
  z-index: 9;
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
