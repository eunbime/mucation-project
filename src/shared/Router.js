import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from 'pages/home';
import Detail from 'pages/detail';
import Write from 'pages/write';
import Profile from 'pages/profile';
import Login from 'pages/login';
import AuthLayout from './Layout/AuthLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
          {/* <Route path="/auth" element={<AuthLayout />}> */}
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
