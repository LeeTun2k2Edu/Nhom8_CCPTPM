import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function AreaChartComponent(props) {
    const { data, width, height, axis, legend } = props;
    return (
        <AreaChart width={width} height={height} data={data}>
            {axis ? <XAxis dataKey="name" /> : null}
            {axis ? <YAxis /> : null}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {legend ? <Legend /> : null}

            <Area
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                fill="#8884d8"
            />
            <Area
                type="monotone"
                dataKey="uv"
                stroke="#82ca9d"
                fill="#82ca9d"
            />
        </AreaChart>
    );
}

export default AreaChartComponent;
