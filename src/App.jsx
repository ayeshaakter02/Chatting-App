import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Not_found from './pages/Not_found';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Rootlayout from './components/Rootlayout';
import Message from './pages/Message';
import Signup from './pages/Signup';
import { Emoji } from 'emoji-picker-react';
import FriendList from './components/FriendList';
import FriendRequestList from './components/FriendRequestList';
import Userlist from './components/Userlist';
import BlockList from './components/Blocklist';
import Homebar from './components/Homebar';

const router =createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Home },
      { path: "/message", Component: Message },
    ],
  },
  {
    path: "/",
    Component: Rootlayout,
    children: [
      { index: true, Component: Homebar},
      { path: "/friendrequest", Component: FriendRequestList },
      { path: "/userlist", Component: Userlist },
      { path: "/blocklist", Component: BlockList },
    ],
  },
  {
    path: "/signin",
    Component: Signin,
  },
  {
    path: "/emoji",
    Component: Emoji,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "*",
    Component: Not_found,
  }
]);

const App = () => {
  
  return (
    <>
    <RouterProvider router={router} />
    </>
  
  )
}
export default App