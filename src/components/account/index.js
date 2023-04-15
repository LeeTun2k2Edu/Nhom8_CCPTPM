import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import apiFunctions from '../../api/api.js';
function Account() {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchUser() {
            try {
                const username = localStorage.getItem('username');
                const response = await apiFunctions.userinfo(username);
                setUser(response);
            } catch (error) {
                alert('An error occurred while fetching user info.');
            }
        }

        fetchUser();
    }, []);

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <div className="card border-0">
                        <div className="card-body">
                            <h1 className="card-title text-center">Thông tin tài khoản</h1>
                            <p className="card-text">Username: {user.username}</p>
                            <p className="card-text">Email: {user.email}</p>
                            <p className="card-text">Name: {user.name}</p>
                            <p className="card-text">Role: {user.role}</p>
                        </div>
                        <Button className="btn btn-primary btn-lg btn-block" onClick={
                            () => {
                                localStorage.removeItem('username');
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                            }
                        }>Log out</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Account;
