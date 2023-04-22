import React, { Fragment, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import apiFunctions from '../../api/api.js'; // Import đối tượng apiFunctions
import {
    faHouse,
    faTable,
    faChartLine,
    faChartPie,
    faInfoCircle,
    faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        apiFunctions
            .login(username, password)
            .then((response) => {
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('username', response.username);
                alert('Logged in successfully.');
                window.location.replace('/home');
            })
            .catch((error) => {
                alert('An error occurred while logging in.');
            });
    };

    return (
        <Fragment>
            <div id="login">
                <Row className="h-100">
                    <Col className="lg-6 h-100 w-100 d-flex justify-content-center align-items-center">
                        <form onSubmit={handleSubmit}>
                            <div className="header text-center">
                                <h1 className="text-primary ">Log in</h1>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
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
                                <label htmlFor="exampleInputPassword1">Password</label>
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
                                    You don't have an account yet? <a href="/signup">Sign up here</a>
                                </small>
                            </div>
                            <div className="d-flex justify-content-center w-100">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Col>
                    <Col className="lg-6 h-100 w-100 theme" onClick={() => (document.location.href = '/')}>
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

export default Login;
