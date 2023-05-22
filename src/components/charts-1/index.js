import { Button, Card, Col, Container, Row} from "react-bootstrap";
import { debounce } from "lodash";
import axios from "axios";
import PieChartComponent from "../pieChartComponent";
import BarChart2ColComponent from "../barChart_2Col_Component";
import BarChart1ColComponent from "../barChart_1Col_Component";
import { useEffect, useState } from "react";
import MyDateTimePicker from "../datetimePicker";

function Charts1(props) {
    const currentDate = new Date();
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [selectedStartDateTime, setSelectedStartDateTime] = useState(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    const [selectedEndDateTime, setSelectedEndDateTime] = useState(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    );

    const handleButtonStartDateClick = () => {
        setShowStartDatePicker(!showStartDatePicker);
    };

    const handleButtonEndDateClick = () => {
        setShowEndDatePicker(!showEndDatePicker);
    };

    const handleStartDateSelect = (date) => {
        setSelectedStartDateTime(date);
        setShowStartDatePicker(false);
    };

    const handleEndDateSelect = (date) => {
        setSelectedEndDateTime(date);
        setShowEndDatePicker(false);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day < 10 ? "0" : ""}${day}-${
            month < 10 ? "0" : ""
        }${month}-${year}`;
    };

    const [data, setData] = useState({
        pieChart: [],
        barChart: [],
        predict: [],
    });

    useEffect(() => {
        const fetchData = debounce(async function () {
            const result = await axios.get("/api/charts", {
                params: {
                    date_start: formatDate(selectedStartDateTime),
                    date_end: formatDate(selectedEndDateTime),
                },
            });
            const d = result.data;

            const pieChart =  [
                { name: "ok", value: 0 },
                { name: "fail", value: 0 },
            ];

            const barChart = [];
            for (let i = 1; i <= 7; i++) {
                barChart.push({
                    name: i,
                    ok: 0,
                    fail: 0,
                });
            }
            
            d.ok.forEach((ok) => {
                barChart[ok[0] - 1].ok += ok[1];
                pieChart[0].value += ok[1];
            });
            d.fail.forEach((fail) => {
                barChart[fail[0] - 1].fail += fail[1];
                pieChart[1].value += fail[1];
            });
            //BarChart of statistic_predict_results
            const barChart2 = [];

            let value_tmp = 0;
            for (let i = 1; i < d.statistic_predict_results.length; i++) {
                if (i % 3 === 0) {
                    barChart2.push({
                        name: `<${i}`,
                        statistic_predict_results: value_tmp,
                    });
                    value_tmp = 0;
                } else {
                    value_tmp += d.statistic_predict_results[i - 1][1];
                }
            }


            setData({
                pieChart: pieChart,
                barChart: barChart,
                predict: barChart2,
            });
        });
        fetchData();
    }, [selectedEndDateTime, selectedStartDateTime]);

    return (
        <div id="charts-1">
            <Container className="charts-1">
                <h2 className="charts-header">
                    Data Charts from{" "}
                    {selectedStartDateTime
                        ? formatDate(selectedStartDateTime)
                        : ""}{" "}
                    to {" "}
                    {selectedEndDateTime ? formatDate(selectedEndDateTime) : ""}
                </h2>

                <div className="select-section pb-4 d-flex">
                    <div className="me-4">
                        <Button onClick={handleButtonStartDateClick}>
                            {showStartDatePicker
                                ? "Close"
                                : "Choose Start Date"}
                        </Button>
                        {showStartDatePicker && (
                            <MyDateTimePicker
                                onSelect={handleStartDateSelect}
                            />
                        )}
                    </div>
                    <div>
                        <Button onClick={handleButtonEndDateClick}>
                            {showEndDatePicker ? "Close" : "Choose End Date"}
                        </Button>
                        {showEndDatePicker && (
                            <MyDateTimePicker onSelect={handleEndDateSelect} />
                        )}
                    </div>
                </div>
                <Row className="charts-content">
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3">Ok / Fail percentage</h5>
                            <PieChartComponent
                                data={data.pieChart}
                                width={300}
                                height={300}
                                label={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">Ok / Fail by angles</h5>
                            <BarChart2ColComponent
                                data={data.barChart}
                                width={500}
                                height={300}
                                axis={true}
                                legend={true}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row className="charts-content">
                    <Col md="12" lg="12">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">
                                Predict result statistic
                            </h5>
                            <BarChart1ColComponent
                                data={data.predict}
                                width={1000}
                                height={500}
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

export default Charts1;
