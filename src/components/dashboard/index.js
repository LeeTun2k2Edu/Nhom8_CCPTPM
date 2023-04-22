import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PieChartComponent from "../pieChartComponent"
import BarChartComponent from "../barChartComponent"
const { debounce } = require("lodash");
const axios = require('axios');

function Dashboard(props) {
    const [ok_records, setOk_records] = useState(0)
    const [fail_records, setFail_records] = useState(0)
    const [ok_angles, setOk_angles] = useState([])
    const [fail_angles, setFail_angles] = useState([])
    const [predict_result_statistic, setPredict_result_statistic] = useState([])

    // fetch option datas => then fetch 1st record
    useEffect(() => {
        const fetchData = debounce(async function () {
            const result = await axios.get("http://localhost:5000/api/overview");
            setOk_records(result.data["ok_records"])
            setFail_records(result.data["fail_records"])
            setOk_angles(result.data["ok_angles"])
            setFail_angles(result.data["fail_angles"])
            setPredict_result_statistic(result.data["predict_result_statistic"])
        }, 1000)
        fetchData()
    }, [ok_records, fail_records, ok_angles, fail_angles, predict_result_statistic]);

    if (!(ok_records && fail_records && ok_angles && fail_angles && predict_result_statistic)) {
        return (
            // Render a loading indicator while waiting for the data to load
            <h1>Loading...</h1>
        );
    }
    return (
        <div id="dashboard">
            <Container className="lastest-report">
                <h3 className="report-header">Charts 1</h3>
                <Row className="report-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container">
                            <h5 className="p-3">Status percentage</h5>
                            <PieChartComponent
                                data={[{'name': 'ok', 'value': ok_records}, {"name": 'fail', "value": fail_records}]}
                                width={300}
                                height={300}
                                label={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container">
                            <h5 className="p-3">Ok angles</h5>
                            <BarChartComponent
                                data={ok_angles.map(item=>{return {'name': item[0], "value": item[1]}})}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row className="report-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container">
                            <h5 className="p-3">Predict result statistic</h5>
                            <BarChartComponent
                                data={predict_result_statistic.map(item=>{return {'name': item[0], "value": item[1]}})}
                                width={300}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container">
                            <h5 className="p-3">Fail Angles</h5>
                            <BarChartComponent
                                data={fail_angles.map(item=>{return {'name': item[0], "value": item[1]}})}
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

export default Dashboard;
