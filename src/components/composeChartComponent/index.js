import React from "react";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function ComposeChartComponent(props) {
    const { data, width, height, axis, legend } = props;
    return (
        <ComposedChart width={width} height={height} data={data}>
            <CartesianGrid />
            {axis ? <XAxis dataKey="name" /> : null}
            {axis ? <YAxis /> : null}
            <Tooltip />

            <Bar dataKey="pv" barSize={20} stroke="#8884d8" fill="#8884d8" />
            <Line
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
                fill="#82ca9d"
            />
            {legend ? <Legend /> : null}
        </ComposedChart>
    );
}

export default ComposeChartComponent;
