import { Card, Col, Container, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axios from "axios";
import PieChartComponent from "../pieChartComponent";
import BarChart2ColComponent from "../barChart_2Col_Component";
import BarChart1ColComponent from "../barChart_1Col_Component";
import { useEffect, useState } from "react";
import Select from "react-select";

function Charts1(props) {
    const [dayStart, setDayStart] = useState(1);
    const [dayEnd, setDayEnd] = useState(1);
    const [ok_records, setOk_records] = useState(0);
    const [fail_records, setFail_records] = useState(0);
    const [ok_angles, setOk_angles] = useState([]);
    const [fail_angles, setFail_angles] = useState([]);
    const [predict_result_statistic, setPredict_result_statistic] = useState(
        []
    );
    const days = [];
    for (let i = 1; i <= 31; i++) days.push(i);

    // fetch option datas => then fetch 1st record
    useEffect(() => {
        const fetchData = debounce(async function () {
            const result = await axios.get("/api/overview", {
                params: {
                    dayStart: dayStart,
                    dayEnd: dayEnd,
                },
            });
            setOk_records(result.data["ok_records"]);
            setFail_records(result.data["fail_records"]);
            setOk_angles(result.data["ok_angles"]);
            setFail_angles(result.data["fail_angles"]);
            setPredict_result_statistic(
                result.data["predict_result_statistic"]
            );
        }, 1000);
        fetchData();
    }, [dayStart, dayEnd]);

    if (
        !(
            ok_records &&
            fail_records &&
            ok_angles &&
            fail_angles &&
            predict_result_statistic
        )
    ) {
        return (
            <Container className="charts-1">
                {dayStart < dayEnd ? (
                    <h3 className="charts-header">
                        API Charts from {dayStart}
                        /12/2022 to {dayEnd}/12/2022
                    </h3>
                ) : (
                    <h3 className="charts-header">
                        API Charts date {dayStart}
                        /12/2022
                    </h3>
                )}
                <div className="select-section">
                    <div className="select-box">
                        <label htmlFor="startDay-select">Day start:</label>
                        <Select
                            id="startDay-select"
                            className="select-box"
                            options={days.map((day) => {
                                return { label: day, value: day };
                            })}
                            defaultValue={{ label: days[0], value: days[0] }}
                            onChange={(newValue) =>
                                setDayStart(newValue["value"])
                            }
                        />
                    </div>
                    <div className="select-box">
                        <label htmlFor="endDay-select">Day end:</label>
                        <Select
                            id="endDay-select"
                            className="select-box"
                            options={days.map((day) => {
                                return { label: day, value: day };
                            })}
                            defaultValue={{ label: days[0], value: days[0] }}
                            onChange={(newValue) =>
                                setDayEnd(newValue["value"])
                            }
                        />
                    </div>
                </div>
                <Row className="charts-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            No information
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <div id="charts-1">
            <Container className="charts-1">
                {dayStart < dayEnd ? (
                    <h3 className="charts-header">
                        API Charts from {dayStart}
                        /12/2022 to {dayEnd}/12/2022
                    </h3>
                ) : (
                    <h3 className="charts-header">
                        API Charts date {dayStart}
                        /12/2022
                    </h3>
                )}
                <div className="select-section">
                    <div className="select-box">
                        <label htmlFor="startDay-select">Day start:</label>
                        <Select
                            id="startDay-select"
                            className="select-box"
                            options={days.map((day) => {
                                return { label: day, value: day };
                            })}
                            defaultValue={{ label: days[0], value: days[0] }}
                            onChange={(newValue) =>
                                setDayStart(newValue["value"])
                            }
                        />
                    </div>
                    <div className="select-box">
                        <label htmlFor="endDay-select">Day end:</label>
                        <Select
                            id="endDay-select"
                            className="select-box"
                            options={days.map((day) => {
                                return { label: day, value: day };
                            })}
                            defaultValue={{ label: days[0], value: days[0] }}
                            onChange={(newValue) =>
                                setDayEnd(newValue["value"])
                            }
                        />
                    </div>
                </div>
                <Row className="charts-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3">Status percentage</h5>
                            <PieChartComponent
                                data={[
                                    { name: "ok", value: ok_records },
                                    { name: "fail", value: fail_records },
                                ]}
                                width={300}
                                height={300}
                                label={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">Ok angles</h5>
                            <BarChart1ColComponent
                                data={ok_angles.map((item) => {
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
                <Row className="charts-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">
                                Predict result statistic
                            </h5>
                            <BarChart1ColComponent
                                data={predict_result_statistic.map((item) => {
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
                            <h5 className="p-3 ms-5">Fail Angles</h5>
                            <BarChart1ColComponent
                                data={fail_angles.map((item) => {
                                    return {
                                        name: item[0],
                                        "Angles: fail": item[1],
                                    };
                                })}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
                                color="#ffa69e"
                                name="Angles: fail"
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Charts1;
