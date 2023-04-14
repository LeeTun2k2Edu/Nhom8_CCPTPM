import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";

function Table(props) {
    // get option/location
    const [options, setOptions] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                "http://localhost:5000/api/locations"
            );
            setOptions(response.data);
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
                "http://localhost:5000/api/location-details",
                {
                    params: {
                        location: newValue["value"],
                    },
                }
            );
            setData(result.data);
        }
        fetchData();
    }

    const columns = [
        {
            name: "STT",
            selector: (row) => row.stt,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: "Angle ID",
            selector: (row) => row.angle_id,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Predict results",
            selector: (row) => row.predict_result,
            sortable: false,
        },
    ];

    return (
        <div id="table">
            <Container className="data-table">
                <h2 className="table-header">Data tables</h2>
                <Select
                    className="select-box"
                    options={options}
                    defaultValue={options.length ? options[0] : "Null"}
                    onChange={optionsOnChangeHandle}
                />
                <DataTable columns={columns} data={data} />
            </Container>
        </div>
    );
}

export default Table;
