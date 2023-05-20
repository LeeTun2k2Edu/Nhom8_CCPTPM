import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { debounce } from "lodash";
import axios from "axios";
import MyDateTimePicker from "../datetimePicker";

function Table(props) {
    const currentDate = new Date();
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
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
                    .get("/api/options")
                    .then((response1) => {
                        setLocations(response1.data["LOCATIONS"]);
                        setStatus(response1.data["STATUS"]);
                        setAngles(response1.data["ANGLES"]);

                        return axios.get("/api/data-table", {
                            params: {
                                location: response1.data["LOCATIONS"][1],
                                status: statusDetail,
                                angle: angle,
                                date_start: formatDate(selectedStartDateTime),
                                date_end: formatDate(selectedEndDateTime),
                            },
                        });
                    })
                    .then((response2) => {
                        setData(response2.data);
                    });
            } else {
                const result = await axios.get("/api/data-table", {
                    params: {
                        location: location,
                        status: statusDetail,
                        angle: angle,
                        date_start: formatDate(selectedStartDateTime),
                        date_end: formatDate(selectedEndDateTime),
                    },
                });
                setData(result.data);
            }
        }, 1000);
        fetchData();
    }, [
        locations,
        location,
        statusDetail,
        angle,
        selectedStartDateTime,
        selectedEndDateTime,
    ]);

    if (locations === null) {
        return (
            // Render a loading indicator while waiting for the data to load
            <h1>Loading...</h1>
        );
    }

    var jsonObject = [];
    for (var i = 1; i < data.length; i++) {
        jsonObject.push({
            stt: data[i][0],
            date: data[i][1],
            angle_id: data[i][2],
            status: data[i][3],
            predict_result: data[i][4],
        });
    }

    console.log(jsonObject);

    const columns = [
        {
            name: "Location",
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

    const itemsPerPage = 10; // Số phần tử hiển thị trên mỗi trang
    const totalItems = jsonObject.length; // Tổng số phần tử

    // Tính toán chỉ mục phần tử bắt đầu và kết thúc trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = jsonObject.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // Hàm xử lý khi người dùng chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const paginationButtons = [];

        // First page button
        paginationButtons.push(
            <Button
                key="first"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="mx-1"

            >
                &lt;&lt;
            </Button>
        );

        // Previous button
        paginationButtons.push(
            <Button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1"

            >
                &lt;
            </Button>
        );

        // Next button
        paginationButtons.push(
            <Button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1"
            >
                &gt;
            </Button>
        );

        // Last page button
        paginationButtons.push(
            <Button
                key="last"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="mx-1"
                
            >
                &gt;&gt;
            </Button>
        );

        return paginationButtons;
    };

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
                                locations[0]
                                    ? {
                                          label: locations[0],
                                          value: locations[0],
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

                    <div className="button-box">
                        <label>
                            Date Start: {formatDate(selectedStartDateTime)}
                        </label>
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
                    <div className="button-box">
                        <label>
                            Date End: {formatDate(selectedEndDateTime)}
                        </label>
                        <Button onClick={handleButtonEndDateClick}>
                            {showEndDatePicker ? "Close" : "Choose End Date"}
                        </Button>
                        {showEndDatePicker && (
                            <MyDateTimePicker onSelect={handleEndDateSelect} />
                        )}
                    </div>
                </div>
                <div className="pt-4">
                    <DataTable columns={columns} data={currentItems} />
                    <div className="pagination d-flex center">{renderPagination()}</div>
                </div>
            </Container>
        </div>
    );
}

export default Table;
