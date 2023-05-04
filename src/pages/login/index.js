import React, { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faTable,
    faChartLine,
    faChartPie,
    faInfoCircle,
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            async function sendData() {
                const response = await axios
                    .post("/api/login", {
                        username: username,
                        password: password,
                    })
                    .catch((error) => {
                        toast.error(error.response.data.error);
                    });

                Cookies.set("user", JSON.stringify(response.data));
                setIsLoggedIn(true);
            }
            sendData();
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <Fragment>
            {isLoggedIn && <Navigate to="/" />}
            <div id="login">
                <Row className="h-100">
                    <Col className="lg-6 h-100 w-100 d-flex justify-content-center align-items-center">
                        <form onSubmit={handleSubmit}>
                            <div className="header text-center">
                                <h1 className="text-primary ">Log in</h1>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <small className="mb-3 mt-1">
                                    You don't have an account yet?{" "}
                                    <a href="/signup">Sign up here</a>
                                </small>
                            </div>
                            <div className="d-flex justify-content-center w-100">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Col>
                    <Col className="lg-6 h-100 w-100 theme">
                        <div className="api">Api</div>
                        <div className="dashboard">Dashboard</div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faHouse} />
                            <FontAwesomeIcon icon={faTable} />
                            <FontAwesomeIcon icon={faChartLine} />
                            <FontAwesomeIcon icon={faChartPie} />
                            <FontAwesomeIcon icon={faCircleQuestion} />
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </div>
                    </Col>
                </Row>
            </div>
            <ToastContainer />
        </Fragment>
    );
}

export default Login;
