import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";

function Table(props) {
    const data = {
        "QNHP114.134/HO": [
            {
                id: "638808adde5fc6cc53b4f0b6",
                stt: 1,
                date: "2022-12-01",
                angle_id: 1,
                status: "ok",
                predict_result: "[1.11]",
            },
            {
                id: "638808d7de5fc6cc53b4f0b7",
                stt: 2,
                date: "2022-12-01",
                angle_id: 2,
                status: "fail",
                predict_result: "[3, 2, 1, 14, 13, 15.1, 20, 18, 19]",
            },
        ],
        "HDGP004.112/HO": [],
        "QNHP114.067/HO": [],
    };

    const options = Object.keys(data).map((key)=>{
        return {value: key, label: key}
    })

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

    const [dataDisplay, setDataDisplay] = useState(Object.keys(data).length?data[Object.keys(data)[0]]:[]);

    return (
        <div id="table">
            <Container className="data-table">
                <h2 className="table-header">Data tables</h2>
                <Select className="select-box" options={options} defaultValue={options.length?options[0]:"Null"} onChange={(newValue)=>setDataDisplay(data[newValue.value])}/>
                <DataTable columns={columns} data={dataDisplay} />
            </Container>
        </div>
    );
}

export default Table;
