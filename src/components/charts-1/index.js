import { Card, Col, Container, Row } from "react-bootstrap";
import RadarChartComponent from "../radarChartComponent";
import ComposeChartComponent from "../composeChartComponent";

function Charts1(props) {
    const axis = [
        { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
        { name: "May", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
    ];

    return (
        <div id="charts-1">
            <Container className="charts-1">
                <h3 className="charts-header">Charts 1</h3>
                <Row className="report-content">
                    <Col md="6" lg="4">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 6</h3>
                            <RadarChartComponent
                                data={axis}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="6" lg="4">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 7</h3>
                            <ComposeChartComponent
                                data={axis}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="6" lg="4">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 7</h3>
                            <ComposeChartComponent
                                data={axis}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row className="report-content">
                    <Col md="6" lg="4">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 6</h3>
                            <RadarChartComponent
                                data={axis}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="6" lg="4">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 7</h3>
                            <ComposeChartComponent
                                data={axis}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="6" lg="4">
                        <Card className="mb-3 pb-3 container">
                            <h3 className="p-3">card 7</h3>
                            <ComposeChartComponent
                                data={axis}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Charts1;
