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
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const handleButtonClick = () => {
        setShowPicker(!showPicker);
    };

    const handleDateSelect = (date) => {
        setSelectedDateTime(date);
        setShowPicker(false);
    };
    return (
        <div id="charts-1">
            <Container className="charts-1">
                <div className="select-section">
                    <div>
                        <Button onClick={handleButtonClick}>
                            {showPicker ? "Hide Picker" : "Show Picker"}
                        </Button>
                        {showPicker && (
                            <MyDateTimePicker onSelect={handleDateSelect} />
                        )}
                        {selectedDateTime && (
                            <Label>
                                Selected Date and Time:{" "}
                                {selectedDateTime.toString()}
                            </Label>
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
