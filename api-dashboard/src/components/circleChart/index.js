import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function CircleChart(props) {
    return (
        <div id="circle-charts">
            <Container className="circle-charts">
                <h2 className="charts-header">Circle Charts</h2>
                <Row className="charts-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 container">
                            <h1>card 1</h1>
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Row>
                            <Col lg="6">
                                <Card className="mb-3 container">
                                    <h1>card 2</h1>
                                </Card>
                                <Card className="mb-3 container">
                                    <h1>card 3</h1>
                                </Card>
                            </Col>
                            <Col lg="6">
                                <Card className="mb-3 container">
                                    <h1>card 4</h1>
                                </Card>
                                <Card className="mb-3 container">
                                    <h1>card 5</h1>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CircleChart;