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

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [errors, setErrors] = useState({});

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
        event.preventDefault();
        let errors = {};
        if (fullname.trim() === '') {
            errors.fullname = 'Full name is required';
        }
        if (username.trim() === '') {
            errors.username = 'Username is required';
        }
        if (email.trim() === '') {
            errors.email = 'Email is required';
        }
        if (password.trim() === '') {
            errors.password = 'Password is required';
        }
        if (confirmPassword.trim() === '') {
            errors.confirmPassword = 'Confirm Password is required';
        }
        if (password.trim() !== confirmPassword.trim()) {
            errors.confirmPassword = 'Password and Confirm Password must match';
        }

        if (Object.keys(errors).length === 0) {
            apiFunctions
                .signup(username, password, email, fullname)
                .then((response) => {
                    window.location.replace('/login');
                })
                .catch((error) => {
                    alert('An error occurred while logging in.');
                });
        } else {
            setErrors(errors);
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
                                <label htmlFor="exampleInputEmail1">Full name</label>
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
                                <label htmlFor="exampleInputUsername">Username</label>
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
                                <label htmlFor="exampleEmailPassword">Email</label>
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
                                <label htmlFor="exampleInputPassword1">Password</label>
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
                                <label htmlFor="exampleInputPassword2">Confirm password</label>
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
                                    <a href="/login"> Login here</a>
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

export default Signup;
