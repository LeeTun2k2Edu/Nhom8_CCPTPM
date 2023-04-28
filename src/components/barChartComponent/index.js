import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function BarChartComponent(props) {
    const { data, width, height, axis, legend, color, name } = props;

    return (
        <BarChart width={width} height={height} data={data}>
            {axis ? <XAxis dataKey="name" /> : null}
            {axis ? <YAxis /> : null}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {legend ? <Legend /> : null}
            <Bar
                dataKey={name ? name : "value"}
                stroke={color ? color : "#8884d8"}
                fill={color ? color : "#8884d8"}
            />
        </BarChart>
    );
}

export default BarChartComponent;
