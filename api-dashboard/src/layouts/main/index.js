import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../components/dashboard";
import Table from "../../components/dataTables";
import CircleChart from "../../components/circleChart";
import LineChart from "../../components/lineChart";
import Help from "../../components/help";
import About from "../../components/about";
import Empty from "../../components/empty";

function Main(props) {
    return (
        <Fragment>
            <div id="main">
                <Routes>
                    <Route path="*" element={<Empty />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/data-tables" element={<Table />} />
                    <Route path="/circle-charts" element={<CircleChart />} />
                    <Route path="/line-charts" element={<LineChart />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/"
                        element={<Navigate to="/home/dashboard" />}
                    />
                </Routes>
            </div>
        </Fragment>
    );
}

export default Main;
