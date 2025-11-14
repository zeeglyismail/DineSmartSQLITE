import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import AboutUs from './Components/About us/AboutUs';
import UserMain from './Components/User Information/User main/UserMain';
import MyOffer from './Components/User Information/My Offer/MyOffer';
import OtherStatus from './Components/User Information/Other Status/OtherStatus';
import OderDetails from './Components/User Information/Order Status Details/OderDetails';
import SignUp from './Components/Sign Up/SignUp';
import SignIn from './Components/Sign In/SignIn';
import Profile from './Components/User Information/Profile/Profile';
import ActiveAccount from './Components/Active Account/ActiveAccount';
import SaveMeals from './Components/User Information/Save Meals/SaveMeals';
import Table from './Components/Table/Table';
import Menu from './Components/Menu/Menu';
import CustomizesMenu from './Components/Customizes Menu/CustomizesMenu';
import Cart from './Components/Cart Page/Cart';
import TAmenu from './Components/Take Away/TAmenu';
import TAmenuDetails from './Components/Take Away/TAMenu Detials/TAmenuDetails';
import DEmenu from './Components/Delivery/Delivery menu/DEmenu';
import DemenuDetails from './Components/Delivery/DEmenu Details/DemenuDetails';
import Privat from './Components/Privat/Privat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children : [


      {
        path : "/",
        element : <Home></Home>
      },

      {
        path : "/about",
        element : <AboutUs></AboutUs>
      },

      {
        path : "/table",
        element : <Table></Table>
      },

      {
        path : "/menu",
        element : <Menu></Menu>
      },

      {
        path : "/TAmenu",
        element : <TAmenu></TAmenu>
      },

      {
        path : "/TAmenu/:Id" , 
        element : <TAmenuDetails></TAmenuDetails>
      },

      {
        path : "/DEmenu",
        element : <DEmenu></DEmenu>
      },

      {
        path : "/DEmenu/:Id" , 
        element : <DemenuDetails></DemenuDetails>
      },

      {
        path : "/cart",
        element : <Privat><Cart></Cart></Privat>
      },

      {
        path : "/menu/:Id" , 
        element : <CustomizesMenu></CustomizesMenu>
      },

      {
        path : "/signup",
        element : <SignUp></SignUp>
      },

      {
        path : "/signup/active_account",
        element : <ActiveAccount></ActiveAccount>
      },

      {
        path : "/signin",
        element : <SignIn></SignIn>
      },


      {
        path : "/user",
        element : <Privat><UserMain></UserMain></Privat>,
        children : [

          {
            path : "/user/profile",
            element : <Privat><Profile></Profile></Privat>
          },

          {
            path : "/user/save-meals",
            element : <Privat><SaveMeals></SaveMeals></Privat>
          },

          {
            path : "/user/my-offer",
            element : <Privat><MyOffer></MyOffer></Privat>
          },

          {
            path : "/user/order-status",
            element : <Privat><OtherStatus></OtherStatus></Privat>
          },

          {
            path : "/user/order-status/:id",
            element : <Privat><OderDetails></OderDetails></Privat>
          }
        ]
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
