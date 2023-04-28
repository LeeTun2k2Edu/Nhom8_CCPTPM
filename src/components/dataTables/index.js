import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { debounce } from "lodash";
import axios from "axios";

function Table(props) {
    const [locations, setLocations] = useState(null);
    const [status, setStatus] = useState(null);
    const [angles, setAngles] = useState(null);
    const [location, setLocation] = useState("-");
    const [statusDetail, setStatusDetail] = useState("-");
    const [angle, setAngle] = useState("-");
    const [data, setData] = useState([]);

    // fetch option datas => then fetch 1st record
    useEffect(() => {
        const fetchData = debounce(async function () {
            setData([]);
            if (!locations) {
                await axios
                    .get("http://localhost:5000/api/options")
                    .then((response1) => {
                        setLocations(response1.data["LOCATIONS"]);
                        setStatus(response1.data["STATUS"]);
                        setAngles(response1.data["ANGLES"]);
                        setLocation(response1.data["LOCATIONS"][1]);
                        return axios.get(
                            "http://localhost:5000/api/data-table",
                            {
                                params: {
                                    location: response1.data["LOCATIONS"][1],
                                    status: statusDetail,
                                    angle: angle,
                                },
                            }
                        );
                    })
                    .then((response2) => {
                        setData(response2.data);
                    });
            } else {
                const result = await axios.get(
                    "http://localhost:5000/api/data-table",
                    {
                        params: {
                            location: location,
                            status: statusDetail,
                            angle: angle,
                        },
                    }
                );
                setData(result.data);
            }
        }, 1000);
        fetchData();
    }, [locations, location, statusDetail, angle]);

    if (locations === null) {
        return (
            // Render a loading indicator while waiting for the data to load
            <h1>Loading...</h1>
        );
    }

    const columns = [
        {
            name: "STT",
            selector: (row) => row.stt,
            sortable: true,
            center: true,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
            center: true,
        },
        {
            name: "Angle ID",
            selector: (row) => row.angle_id,
            sortable: true,
            center: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            center: true,
        },
        {
            name: "Predict results",
            selector: (row) => row.predict_result,
            sortable: false,
            width: "40%",
        },
    ];

    return (
        <div id="table">
            <Container className="data-table">
                <h2 className="table-header">Data tables</h2>
                <div className="select-section">
                    <div className="select-box">
                        <label htmlFor="location-select">Location:</label>
                        <Select
                            id="location-select"
                            options={locations.map((location) => {
                                return { label: location, value: location };
                            })}
                            defaultValue={
                                locations[1]
                                    ? {
                                          label: locations[1],
                                          value: locations[1],
                                      }
                                    : "Null"
                            }
                            onChange={(newValue) => {
                                setLocation(newValue["value"]);
                            }}
                        />
                    </div>
                    <div className="select-box">
                        <label htmlFor="status-select">Status:</label>
                        <Select
                            id="status-select"
                            options={status.map((s) => {
                                return { label: s, value: s };
                            })}
                            defaultValue={
                                status[0]
                                    ? { label: status[0], value: status[0] }
                                    : "Null"
                            }
                            onChange={(newValue) => {
                                setStatusDetail(newValue["value"]);
                            }}
                        />
                    </div>
                    <div className="select-box">
                        <label htmlFor="angle-select">Angle: </label>
                        <Select
                            className="angle-select"
                            options={angles.map((angle) => {
                                return { label: angle, value: angle };
                            })}
                            defaultValue={
                                angle[0]
                                    ? { label: angle[0], value: angle[0] }
                                    : "Null"
                            }
                            onChange={(newValue) => {
                                setAngle(newValue["value"]);
                            }}
                        />
                    </div>
                </div>
                <DataTable columns={columns} data={data} />
            </Container>
        </div>
    );
}

export default Table;
