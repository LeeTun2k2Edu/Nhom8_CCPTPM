import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PieChartComponent from "../pieChartComponent";
import BarChartComponent from "../barChartComponent";
import { debounce } from "lodash";
import axios from "axios";

function Dashboard(props) {
    const [lastMonthData, setLastMonthData] = useState({
        "pieChart":[],
        "barChart":[],
        "predict":[]
    });

    useEffect(() => {
        const fetchData = debounce(async function () {
            const result = await axios.get("/api/overview");
            const last_month = result.data.last_month
            setLastMonthData({
                "pieChart":[{"name": "ok", "value": last_month.ok.length}, {"name": "fail", "value": last_month.fail.length}],
                "barChart":[],
                "predict":[]
            })


            const current_month = result.data.current_month
        });
        fetchData();
    }, []);

    return (
        <div id="dashboard">
            <Container className="lastest-report">
                <h3 className="report-header pb-4">Overview API 12/2022</h3>
                <Row className="report-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3">Status percentage</h5>
                            <PieChartComponent
                                data={lastMonthData.pieChart}
                                width={300}
                                height={300}
                                label={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3">Status percentage</h5>
                            <PieChartComponent
                                data={[]}
                                width={300}
                                height={300}
                                label={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row className="report-content">
                <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">Ok angles</h5>
                            <BarChartComponent
                                data={[
                                    [1, 1],
                                    [1, 2],
                                    [1, 3],
                                ].map((item) => {
                                    return {
                                        name: item[0],
                                        "Angles: ok": item[1],
                                    };
                                })}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
                                color="#ade7b6"
                                name="Angles: ok"
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">Ok angles</h5>
                            <BarChartComponent
                                data={[
                                    [1, 1],
                                    [1, 2],
                                    [1, 3],
                                ].map((item) => {
                                    return {
                                        name: item[0],
                                        "Angles: ok": item[1],
                                    };
                                })}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
                                color="#ade7b6"
                                name="Angles: ok"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row className="report-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">
                                Predict result statistic
                            </h5>
                            <BarChartComponent
                                data={[
                                    [1, 1],
                                    [1, 2],
                                    [1, 3],
                                ].map((item) => {
                                    return {
                                        name: item[0],
                                        "Predict result": item[1],
                                    };
                                })}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
                                name="Predict result"
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">
                                Predict result statistic
                            </h5>
                            <BarChartComponent
                                data={[
                                    [1, 1],
                                    [1, 2],
                                    [1, 3],
                                ].map((item) => {
                                    return {
                                        name: item[0],
                                        "Predict result": item[1],
                                    };
                                })}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
                                name="Predict result"
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
