import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function Help(props) {
    return (
        <div id="help">
            <Container className="help">
                <Row>
                    <Col>
                        <Card className="container mb-3">
                            <h2 className="help-header my-3">Dashboard help</h2>
                            <p>
                                Welcome to your dashboard! Here are some
                                resources to help you get the most out of your
                                experience:
                            </p>
                            <h5>Getting Started Guide</h5>
                            <p>
                                If you're new to this dashboard, start{" "}
                                <a href="/">here</a>! Our getting started guide
                                will walk you through the basics of using your
                                dashboard and getting the most out of its
                                features.
                            </p>
                            <h5>Frequently Asked Questions</h5>
                            <p>
                                Have a question? Check out our{" "}
                                <a href="/">FAQ</a> section to see if we've
                                already answered it. If not, feel free to
                                contact our support team for assistance.
                            </p>
                            <h5>Glossary</h5>
                            <p>
                                If you're new to this industry, you might not be
                                familiar with all the technical{" "}
                                <a href="/">terms and jargon</a>. Our glossary
                                provides definitions for commonly used terms and
                                concepts.
                            </p>
                            <h5>Tutorials and How-to Guides</h5>
                            <p>
                                Need help with a specific task?{" "}
                                <a href="/">Our tutorials</a>
                                and how-to guides provide step-by-step
                                instructions for completing common tasks within
                                your dashboard.
                            </p>
                            <h5>Troubleshooting</h5>
                            <p>
                                Having an issue with your dashboard? Check out
                                <a href="/">our troubleshooting guide</a>
                                for common problems and solutions. If you're
                                still having trouble, contact our support team
                                for assistance.
                            </p>
                            <h5>Support Resources</h5>
                            <p>
                                Need additional assistance? Our support team is
                                available to help. <a href="/">Contact us</a>{" "}
                                via email, phone, or live chat for help with any
                                questions or issues.
                            </p>
                            <h5>Video Demos</h5>
                            <p>
                                Sometimes it's easier to learn by watching
                                someone else do it. Check out our{" "}
                                <a href="/">video demos</a>
                                for a visual walkthrough of key features and
                                tasks within your dashboard.
                            </p>
                            <h5>User Feedback</h5>
                            <p>
                                We value your input! If you have any feedback or
                                suggestions for how we can improve your
                                dashboard experience, please{" "}
                                <a href="/">let us know</a>. We're always
                                looking for ways to improve and make our product
                                better for our users.
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Help;
