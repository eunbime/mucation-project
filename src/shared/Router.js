import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from 'pages/home';
import Detail from 'pages/detail';
import Write from 'pages/write';
import Profile from 'pages/profile';
import Login from 'pages/login';
import AuthLayout from './Layout/AuthLayout';
import { useSelector } from 'react-redux';

const Router = () => {
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login/:mode" element={isLogin ? <Navigate to="/" /> : <Login />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/write/:mode" element={isLogin ? <Write /> : <Navigate to="/login/login" />} />
          <Route path="/profile" element={isLogin ? <Profile /> : <Navigate to="/login/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
