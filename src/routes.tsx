import Error404 from "./pages/Error404Page";
import BookmarkPage from "./pages/BookmarkPage";
import CategoryPage from "./pages/CategoryPage";
import EditPage from "./pages/EditPage";
import SearchPage from "./pages/SearchPage";
import Main from "./pages/Main";

export type RouteType = {
  name: string;
  key: string;
  route: string;
  component: React.ReactElement;
};

const routes: Array<RouteType> = [
  {
    name: "BookmarkPage",
    key: "BookmarkPage",
    route: "/BookmarkPage",
    component: <BookmarkPage />,
  },
  {
    name: "CategoryPage",
    key: "CategoryPage",
    route: "/CategoryPage/:category",
    component: <CategoryPage />,
  },
  {
    name: "EditPage",
    key: "EditPage",
    route: "/EditPage/:url",
    component: <EditPage />,
  },
  {
    name: "Error404",
    key: "Error404",
    route: "/404",
    component: <Error404 />,
  },
  {
    name: "SearchPage",
    key: "SearchPage",
    route: "/SearchPage",
    component: <SearchPage />,
  },
  {
    name: "/",
    key: "/",
    route: "/",
    component: <Main />,
  },
];

export default routes;
