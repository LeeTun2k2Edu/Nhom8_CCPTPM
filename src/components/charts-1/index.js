import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { debounce } from "lodash";
import axios from "axios";
import PieChartComponent from "../pieChartComponent";
import BarChart2ColComponent from "../barChart_2Col_Component";
import BarChart1ColComponent from "../barChart_1Col_Component";
import { useEffect, useState } from "react";
import MyDateTimePicker from "../datetimePicker";
import Select from "react-select";
import { Label } from "recharts";

function Charts1(props) {
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);

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

    return (
        <div id="charts-1">
            <Container className="charts-1">
                {selectedStartDateTime ? (
                    <h2 className="charts-header">
                        Charts from {formatDate(selectedStartDateTime)} to
                        {formatDate(selectedStartDateTime)}
                    </h2>
                ) : (
                    <h2 className="charts-header">Charts</h2>
                )}
                <div className="select-section">
                    <div>
                        <Button onClick={handleButtonStartDateClick}>
                            {showStartDatePicker ? "Close" : "Choose Start Date"}
                        </Button>
                        {showStartDatePicker && (
                            <MyDateTimePicker onSelect={handleStartDateSelect} />
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
                    <Col md="12" lg="6">
                        <Card className="mb-3 pb-3 container d-flex center">
                            <h5 className="p-3 ms-5">Ok angles</h5>
                            <BarChart1ColComponent
                                data={[]}
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
                    <Col md="12" lg="12">
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

export default Charts1;
