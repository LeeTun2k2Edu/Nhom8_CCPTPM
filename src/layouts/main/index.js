import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../components/dashboard";
import Table from "../../components/dataTables";
import Charts from "../../components/charts-1";
import Help from "../../components/help";
import About from "../../components/about";
import Empty from "../../components/empty";
import Account from "../../components/account";

function Main(props) {
    return (
        <Fragment>
            <div id="main">
                <Routes>
                    <Route path="*" element={<Empty />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/overview" element={<Dashboard />} />
                    <Route path="/data-tables" element={<Table/>} />
                    <Route path="/charts" element={<Charts />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/"
                        element={<Navigate to="/home/overview" />}
                    />
                </Routes>
            </div>
        </Fragment>
    );
}

export default Main;
