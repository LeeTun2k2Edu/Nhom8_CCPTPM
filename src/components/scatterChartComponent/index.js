import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function ScatterChartComponent(props) {
    const { data, width, height, axis, legend } = props;
    return (
        <ScatterChart width={width} height={height} data={data}>
            {axis ? <XAxis dataKey="uv"/> : null}
            {axis ? <YAxis dataKey="value"/> : null}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {legend ? <Legend /> : null}
            <Scatter
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
            />
        </ScatterChart>
    );
}

export default ScatterChartComponent;
