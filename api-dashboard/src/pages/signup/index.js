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

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can perform your signup logic using the username, email, and password state values
        // For example, you can send a POST request to your backend API to create a new user account
        console.log(
            `Signed up with username: ${username}, email: ${email}, and password: ${password}`
        );
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
                                <label htmlFor="exampleEmailPassword">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleEmailPassword"
                                    placeholder="Password"
                                    value={email}
                                    onChange={handleEmailChange}
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
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword2">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword2"
                                    placeholder="Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <small className="mb-3 mt-1">
                                    You have an account already?
                                    <a href="/login">Login here</a>
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
                    <Col
                        className="lg-6 h-100 w-100 theme"
                        onClick={() => (document.location.href = "/")}
                    >
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
        </Fragment>
    );
}

export default Signup;
