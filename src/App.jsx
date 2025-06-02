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
    path: "/signin",
    Component: Signin,
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
  // {
  //   path: "/",
  //   element:<Signin/>
  // },{
  //   path: "*",
  //   element:<Not_found/>
  // },
  // {
  //   path: "/home",
  //   element:<Home/>
  // }
  // ,{
  //   path: "/signup",
  //   element:<Singup/>
  // },

const App = () => {
  return (
  <RouterProvider router={router} />
  )
}

export default App