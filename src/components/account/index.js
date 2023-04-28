import React, { useContext, useState } from "react";
import Context from "../context";
import { Card, Col, Container, Row } from "react-bootstrap";
import avatar1 from "../../assets/images/avatars/0.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

function Account() {
    const { user, setUser } = useContext(Context);
    const username = user["username"];
    const [password, setPassword] = useState(user["password"]);
    const [email, setEmail] = useState(user["email"]);
    const [fullname, setFullname] = useState(user["full_name"]);
    const [image, setImage] = useState(user["image"]);
    const role = user["role"];

    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleFullnameChange = (event) => setFullname(event.target.value);
    const handleImageChange = (event) => {setImage(event.target.value);console.log(event.target.value)};

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent default form submission behavior
        try {
            async function sendData() {
                const response = await axios
                    .put(`http://localhost:5000/api/users/${username}`, {
                        password: password,
                        email: email,
                        full_name: fullname,
                        image: image,
                        role: role,
                    })
                    .catch((error) => {
                        toast.error(error.response.data.error);
                    });
                toast.success(response.data.message);

                // set context
                const newUser = {
                    email: email,
                    full_name: fullname,
                    image: image,
                    password: password,
                    role: role,
                    username: username,
                }
                setUser(newUser);

                //set cookie;
                Cookies.set("user", JSON.stringify(newUser));
            }
            sendData();
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div id="account">
            <Container className="account">
                <h2 className="account-header">Edit Profile</h2>
                <Row className="h-100">
                    <Col className="lg-6 h-100 w-100 d-flex justify-content-center align-items-center">
                        <Card className="container mb-3">
                            <Container className="d-flex">
                                <Col className="cole-8">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="w-75"
                                    >
                                        <div className="form-group">
                                            <h5>Username: {username}</h5>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">
                                                <h5>Password:</h5>
                                            </label>
                                            <input
                                                required
                                                className="form-control"
                                                placeholder="Enter password"
                                                type="password"
                                                name="password"
                                                defaultValue={user["password"]}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                <h5>Email:</h5>
                                            </label>
                                            <input
                                                required
                                                className="form-control"
                                                placeholder="Enter email"
                                                type="email"
                                                name="email"
                                                defaultValue={user["email"]}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="full_name">
                                                <h5>Full Name:</h5>
                                            </label>
                                            <input
                                                required
                                                className="form-control"
                                                placeholder="Enter your full name"
                                                type="text"
                                                name="full_name"
                                                defaultValue={user["full_name"]}
                                                onChange={handleFullnameChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="image">
                                                <h5>Image URL:</h5>
                                            </label>
                                            <input
                                                required
                                                className="form-control"
                                                placeholder="Enter your image url"
                                                type="text"
                                                name="image"
                                                defaultValue={user["image"]}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center w-100 m-4">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </Col>
                                <Col className="col-4 d-flex center">
                                    <img
                                        src={
                                            image === "guest" ? avatar1 : image
                                        }
                                        className="rounded-circle border border-secondary p-2 avatar"
                                        alt="User Avatar"
                                    />
                                </Col>
                            </Container>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    );
}

export default Account;
