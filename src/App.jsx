import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Not_found from './pages/Not_found';
import Home from './pages/Home';
import Singup from './pages/Signup';
import Signin from './pages/Signin';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },{
    path: "*",
    element:<Not_found/>
  },{
    path: "/signin",
    element:<Signin/>
  },{
    path: "/signup",
    element:<Singup/>
  },
]);

const App = () => {
  return (
  <RouterProvider router={router} />
  )
}

export default App