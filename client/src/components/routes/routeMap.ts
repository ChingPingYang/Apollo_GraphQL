import React from "react";
import { Route } from "../../types/types";
const Home = React.lazy(() => import("../homePage/Home"));
const Register = React.lazy(() => import("../registerPage/RegisterContainer"));
const Login = React.lazy(() => import("../loginPage/LoginContainer"));

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
