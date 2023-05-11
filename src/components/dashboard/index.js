import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PieChartComponent from "../pieChartComponent";
import BarChart1ColComponent from "../barChart_1Col_Component";
import BarChart2ColComponent from "../barChart_2Col_Component";
import { debounce } from "lodash";
import axios from "axios";

function Dashboard(props) {
    const [lastMonthData, setLastMonthData] = useState({
        pieChart: [],
        barChart: [],
        predict: [],
    });

    const [currentMonthData, setCurrentMonthData] = useState({
        pieChart: [],
        barChart: [],
        predict: [],
    });

    useEffect(() => {
        const fetchData = debounce(async function () {
            const result = await axios.get("/api/overview");
            const last_month = result.data.last_month;
            const barChart_lastmonth = []
            for (let i = 1; i <= 7; i++) {
                barChart_lastmonth.push({
                    "name": i,
                    "ok": 0,
                    "fail": 0
                })
            }
            last_month.ok.forEach(ok=>barChart_lastmonth[ok[0]-1].ok += ok[1])
            last_month.fail.forEach(fail=>barChart_lastmonth[fail[0]-1].fail += fail[1])

            setLastMonthData({
                pieChart: [
                    { "name": "ok", "value": last_month.ok.length },
                    { "name": "fail", "value": last_month.fail.length },
                ],
                barChart: barChart_lastmonth,
                predict: [],
            });

            const current_month = result.data.current_month;
            const barChart_currentmonth = []
            for (let i = 1; i <= 7; i++) {
                barChart_currentmonth.push({
                    "name": i,
                    "ok": 0,
                    "fail": 0
                })
            }
            current_month.ok.forEach(ok=>barChart_currentmonth[ok[0]-1].ok += ok[1])
            current_month.fail.forEach(fail=>barChart_currentmonth[fail[0]-1].fail += fail[1])
            setCurrentMonthData({
                pieChart: [
                    { "name": "ok", "value": current_month.ok.length },
                    { "name": "fail", "value": current_month.fail.length },
                ],
                barChart: barChart_currentmonth,
                predict: [],
            });
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
                                data={currentMonthData.pieChart}
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
                            <BarChart2ColComponent
                                data={lastMonthData.barChart}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">Ok angles</h5>
                            <BarChart2ColComponent
                                data={currentMonthData.barChart}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
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
                            <BarChart1ColComponent
                                data={[]}
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
                            <BarChart1ColComponent
                                data={[]}
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
