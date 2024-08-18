import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home/home';
import Login from './views/Login/login';
import Signup from './views/Signup/signup';
import AddTransaction from './views/addTransaction/addTransaction';


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
  {
    path: '/add',
    element: <AddTransaction/>,
  },
  {
    path: '*',
    element: <h1>404 NOT FOUND</h1>,
  }
])

root.render(<RouterProvider router={router}/>);

