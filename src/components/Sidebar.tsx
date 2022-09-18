import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
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

type SideBarPropsType = { isSidebarOpen: boolean };

function Sidebar({ isSidebarOpen }: SideBarPropsType) {
  const { category } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const firstPath = pathname.split("/")[1];

  const onClickSidebarHandler = (param: string) => {
    navigate(param);
  };

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <MenuWrap>
        {MenuList.map((menu, idx) => {
          if (menu.value === "contour") {
            return <Hr key={idx} />;
          }
          return (
            <MenuText
              key={idx}
              className={
                category === menu.value || firstPath === menu.value
                  ? "selected"
                  : "unSelected"
              }
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

const SidebarContainer = styled.div<SideBarPropsType>`
  width: 300px;
  height: calc(100% - 64px);
  position: fixed;
  top: 64px;
  background-color: white;
  z-index: 9;
  left: -300px;
  transition-duration: 0.2s;
  transform: ${(props) =>
    props.isSidebarOpen === true ? `translateX(300px)` : `none`};
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
