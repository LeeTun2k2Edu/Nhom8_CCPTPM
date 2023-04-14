import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function About(props) {
    return (
        <div id="about">
            <Container>
                <Row>
                    <Col>
                        <Card className="container mb-3">
                            <h2 className="about-header my-3">About</h2>
                            <p>
                                This is a dashboard app created as a project for
                                the Software Development Tools and Environment
                                course at University of Technology and Education
                                in Ho Chi Minh City. It is designed to provide
                                users with a dashboard to display api.
                            </p>
                            <p>
                                The app was built using ReactJS, Bootstrap, and
                                various other libraries and tools. It features a
                                responsive and intuitive user interface, and
                                provides users with powerful data analysis and
                                visualization tools.
                            </p>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="lg-6 md-12">
                        <Card className="container mb-3 h-100">
                            <h2 className="about-header my-3">Developers</h2>
                            <ul>
                                <li>Nguyễn Đức Hiển - 20110643</li>
                                <li>Võ Ngọc Quý - 20110709</li>
                                <li>Lê Quang Tùng - 20110746</li>
                            </ul>
                        </Card>
                    </Col>
                    <Col className="lg-6 md-12">
                        <Card className="container mb-3 h-100">
                            <h2 className="about-header my-3">Contact Us</h2>
                            <p>
                                If you have any questions or concerns about the
                                app, please feel free to contact us at:
                            </p>
                            <ul>
                                <li>Email: 20110746@student.hcmute.edu.vn</li>
                                <li>Phone: +84 96 170 8824</li>
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;
