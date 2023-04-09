import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function LineChartComponent(props) {
    const { data, width, height, axis, legend } = props;
    return (
        <LineChart width={width} height={height} data={data}>
            {axis ? <XAxis dataKey="name" /> : null}
            {axis ? <YAxis /> : null}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {legend ? <Legend /> : null}
            <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                fill="#8884d8"
            />
            <Line
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
                fill="#82ca9d"
            />
        </LineChart>
    );
}

export default LineChartComponent;
