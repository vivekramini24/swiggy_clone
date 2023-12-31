import React, { Suspense } from "react";
import { createPortal } from 'react-dom';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import RestuarentData from "./components/RestuarentData/RestuarentData";
import Locationsidebar from './components/LoationSidebar/LocationSidebar';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from './components/Home/Main';
import Profile from './components/Profile/Profile'
import Login from './components/LoginSidebar/Index';
import Cart from './components/Cart/Cart';
import Address from './components/Cart/Addaddress';
const location_sidebar = document.getElementById('sidebar_modal');
const login_sidebar = document.getElementById('login_modal');
const address_modal = document.getElementById('address_sidebar');

const AppLayout = () => {
  
  const isSidebar = useSelector((state) => state.restuarents.isSidebar);
  const isLoginSidebar = useSelector((state) => state.restuarents.isLoginSidebar);
  const savedaddress = useSelector((state) => state.restuarents.savedaddress);
  
  return (
    <>
     {isSidebar&&createPortal(<Locationsidebar/>,location_sidebar)}
     {isLoginSidebar&&createPortal(<Login/>,login_sidebar)}
     {savedaddress&&createPortal(<Address/>,address_modal)}
      <Navbar />
      <Outlet />
    </>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Main/>,
      },
      {
        path: "/restaurants/:resId",
        element: <RestuarentData />,
      },{
        path: "/profile",
        element:<Profile/>
      },{
        path:"/cart",
        element:<Cart/>
      }
    ],
  }
]);
const App=()=> {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
