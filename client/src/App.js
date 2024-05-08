import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import MediaCard from './oldComponents/example';
import FormikDoc from './oldComponents/ex2';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productSlice from './Slices/productSlice';
import HeadlessDemo from './oldComponents/login2';
import store from './app/store';
import BasicDemo from './components/view3';
import Options from './oldComponents/options';
import React from 'react';

// import "primereact/resources/themes/arya-blue/theme.css"
// import "primereact/resources/primereact.min.css"

import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage';
import MyAppBar from './components/myAppBar';
import PreviousOrders from './components/previousOrders'
import AllOrders from './components/allOrders';
import ViewAdmin from './components/viewAdmin';
import Orders from './components/orders';
import AdminAppBar from './components/adminAppBar';
import { useGetOrdersQuery } from './app/appOrders/orderApiSlice';
import MyContext from './ordersContext';
import AllUsers from './components/allUsers';
import Comment from './components/comment';
import Comments from './components/comments';

// const user = {
//   userName: "aa",
//   password: "11",
//   phone: "999",
//   Shoppingbasket: []
// }


function App() {


  return (

    <BrowserRouter>
      <div className="App">
        {/* <Orders /> */}
        <MyAppBar />
        {/* <AdminAppBar/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/view' element={<BasicDemo />} />
          <Route path='/PreviousOrders' element={<PreviousOrders />} />
          <Route path='/adminAppBar' element={<AdminAppBar />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/adminAppBar' element={<AdminAppBar />} />
          <Route path='/viewAdmin' element={<ViewAdmin />} />
          <Route path='/allUsers' element={<AllUsers />} />
          <Route path='/homePage' element={<HomePage/>}></Route>
          <Route path='/comment' element={<Comment/>}></Route>
          <Route path='/comments' element={<Comments/>}></Route>

        </Routes>
      </div>

    </BrowserRouter>

  );
}

export default App;
