import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Layout from "../components/Layout";
import Users from "../components/Users";
import Profile from "../components/Profile";
import SearchUser from "../components/SearchUser";
import UserProfile from "../components/UserProfile";
import RepoDetails from "../components/RepoDetails";
import Error from "../components/Error/Error";

export const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/userProfile", element: <Profile /> },
      { path: "/searchUsers", element: <SearchUser /> },
      { path: "/users", element: <Users /> },
      { path: "/users/user/:username", element: <UserProfile /> },
      { path: "/repo-details/:name/:username", element: <RepoDetails /> }
    ]
  },
  { path: "*", element: <Error /> }
]);