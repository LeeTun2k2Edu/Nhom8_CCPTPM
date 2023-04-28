import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function Logout() {
    Cookies.remove("user");

    return <Navigate to="/login" />;
}

export default Logout;
