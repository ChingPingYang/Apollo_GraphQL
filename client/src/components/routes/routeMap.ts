import { Route } from "../../types/types";
import Home from "../homePage/Home";
import Register from "../registerPage/RegisterContainer";
import Login from "../loginPage/LoginContainer";

const routesMap: Route[] = [
  {
    component: Home,
    path: "/",
    restricted: false,
    exact: true,
    isPrivate: false,
  },
  {
    component: Register,
    path: "/register",
    restricted: true,
    exact: false,
    isPrivate: false,
  },
  {
    component: Login,
    path: "/login",
    restricted: true,
    exact: false,
    isPrivate: false,
  },
];
export default routesMap;
