import { Card, Col, Container, Row } from "react-bootstrap";

import LineChartComponent from "../lineChartComponent";
import BarChartComponent from "../barChartComponent";
import AreaChartComponent from "../areaChartComponent";
import PieChartComponent from "../pieChartComponent";
import ScatterChartComponent from "../scatterChartComponent";
import RadarChartComponent from "../radarChartComponent";
import ComposeChartComponent from "../composeChartComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function Charts1(props) {
    const [options, setOptions] = useState(null);
    const [okItem, setOkItems] = useState({})
    const [failItem, setFailItems] = useState({})
    const [predict, setPredict] = useState({})

    // fetch option datas => then fetch 1st record
    useEffect(() => {
        async function fetchData() {
            await axios
                .get("http://localhost:5000/api/data-table/locations")
                .then((response1) => {
                    setOptions(response1.data);
                    return axios.get(
                        "http://localhost:5000/api/charts",
                        {
                            params: {
                                location: response1.data[0]["value"],
                            },
                        }
                    );
                })
                .then((response2) => {
                    setOkItems(response2.data["ok_item"]);
                    setFailItems(response2.data["fail_item"]);
                    setPredict(response2.data["predict"]);
                })
        }
        fetchData();
    }, []);

    if (options === null) {
        return (
            // Render a loading indicator while waiting for the data to load
            <div>Loading...</div>
        );
    }

    // event options change
    function optionsOnChangeHandle(newValue) {
        async function fetchData() {
            const result = await axios.get(
                "http://localhost:5000/api/charts",
                {
                    params: {
                        location: newValue["value"],
                    },
                }
            );
            setOkItems(result.data["ok_item"]);
            setFailItems(result.data["fail_item"]);
            setPredict(result.data["predict"]);
        }
        fetchData();
    }

    const axis = [
        { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
        { name: "May", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
    ];

    const ratio_OkFail = [
        { "name": "ok", "value": Object.keys(okItem).length },
        { "name": "fail", "value": Object.keys(failItem).length },
    ]

    console.log(predict)
    const avgPredictBars = Object.keys(predict).map(key=>{
        return {
            "name": key,
            "pv": predict[key]
        }   
    })


    return (
        <div id="charts-1">
            <Container className="charts-1">
                <h3 className="charts-header">Charts 1</h3>
                <Select
                    className="select-box"
                    options={options}
                    defaultValue={options.length ? options[0] : "Null"}
                    onChange={optionsOnChangeHandle}
                />
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
                                        data={avgPredictBars}
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
                                        data={ratio_OkFail}
                                        width={200}
                                        height={200}
                                        label={false}
                                        legend={true}
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

export default Charts1;
