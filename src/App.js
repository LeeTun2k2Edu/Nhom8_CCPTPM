import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./assets/css/style.css";
import AdminPage from "./pages/admin";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PageNotFound from "./pages/404";

function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/home/*" element={<AdminPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/"
                    element={<Navigate replace to="/home/overview" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
