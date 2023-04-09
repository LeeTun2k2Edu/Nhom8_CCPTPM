import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import LineChartComponent from "../lineChartComponent";
import BarChartComponent from "../barChartComponent";
import AreaChartComponent from "../areaChartComponent";
import PieChartComponent from "../pieChartComponent";
import ScatterChartComponent from "../scatterChartComponent";
import RadarChartComponent from "../radarChartComponent";
import ComposeChartComponent from "../composeChartComponent";

function Charts2(props) {
    const axis = [
        { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
        { name: "May", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
    ];

    const pieChart = [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 2000 },
        { name: "Apr", value: 2780 },
        { name: "May", value: 1890 },
    ];

    return (
        <div id="charts-2">
            <Container className="charts-2">
                <h3 className="charts-header">Charts 1</h3>
                <Row className="charts-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 1</h3>
                            <LineChartComponent
                                data={axis}
                                width={500}
                                height={400}
                                axis={false}
                                legend={false}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Row>
                            <Col lg="6">
                                <Card className="mb-3 pb-3 container">
                                    <h3 className="p-3">card 2</h3>
                                    <BarChartComponent
                                        data={axis}
                                        width={200}
                                        height={200}
                                        axis={false}
                                        legend={false}
                                    />
                                </Card>
                                <Card className="mb-3 pb-3 container">
                                    <h3 className="p-3">card 3</h3>
                                    <AreaChartComponent
                                        data={axis}
                                        width={200}
                                        height={200}
                                        axis={false}
                                        legend={false}
                                    />
                                </Card>
                            </Col>
                            <Col lg="6">
                                <Card className="mb-3 pb-3 container">
                                    <h3 className="p-3">card 4</h3>
                                    <PieChartComponent
                                        data={pieChart}
                                        width={200}
                                        height={200}
                                        label={false}
                                        legend={false}
                                    />
                                </Card>
                                <Card className="mb-3 pb-3 container">
                                    <h3 className="p-3">card 5</h3>
                                    <ScatterChartComponent
                                        data={axis}
                                        width={200}
                                        height={200}
                                        axis={false}
                                        legend={false}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="charts-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 6</h3>
                            <RadarChartComponent
                                data={axis}
                                width={500}
                                height={400}
                                axis={false}
                                legend={false}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 7</h3>
                            <ComposeChartComponent
                                data={axis}
                                width={500}
                                height={400}
                                axis={false}
                                legend={false}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Charts2;
