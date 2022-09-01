import Error404 from "./pages/Error404Page";
import BookmarkPage from "./pages/BookmarkPage";
import CategoryPage from "./pages/CategoryPage";
import EditPage from "./pages/EditPage";
import Test from "./pages/Test";

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
    route: "/EditPage/:uuid",
    component: <EditPage />,
  },
  {
    name: "Error404",
    key: "Error404",
    route: "/404",
    component: <Error404 />,
  },
  {
    name: "Test",
    key: "Test",
    route: "/Test",
    component: <Test />,
  },
];

export default routes;
