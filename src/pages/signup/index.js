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
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullname, setFullname] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleFullnameChange = (event) => {
        setFullname(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent default form submission behavior
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        // make API request to register user with provided information
        // if error, display error message using toast
        try {
            async function sendData() {
                const response = await axios
                    .post("/api/signup", {
                        username: username,
                        password: password,
                        email: email,
                        full_name: fullname,
                    })
                    .catch((error) => {
                        toast.error(error.response.data.error);
                    });
                toast.success(response.data.message);
            }
            sendData();
        } catch (error) {
            console.log(error.response.data);
        }
    };
    return (
        <Fragment>
            <div id="signup">
                <Row className="h-100">
                    <Col className="lg-6 h-100 w-100 d-flex justify-content-center align-items-center">
                        <form onSubmit={handleSubmit}>
                            <div className="header text-center">
                                <h1 className="text-primary ">Sign up</h1>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Full name"
                                    value={fullname}
                                    onChange={handleFullnameChange}
                                    required // thêm thuộc tính required để đảm bảo không được để trống
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputUsername"
                                    aria-describedby="usernameHelp"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required // thêm thuộc tính required để đảm bảo không được để trống
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleEmailPassword">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleEmailPassword"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required // thêm thuộc tính required để đảm bảo không được để trống
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
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required // thêm thuộc tính required để đảm bảo không được để trống
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword2">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword2"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required // thêm thuộc tính required để đảm bảo không được để trống
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <small className="mb-3 mt-1">
                                    Already have an account?
                                    <Link to="/signup">Log in here</Link>
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

export default Signup;
