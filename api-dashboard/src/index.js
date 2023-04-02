import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './assets/css/style.css';
import reportWebVitals from "./reportWebVitals";
import AdminPage from "./pages/admin";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PageNotFound from "./pages/404"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/home/*" element={<AdminPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Navigate replace to="/home/dashboard" />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
