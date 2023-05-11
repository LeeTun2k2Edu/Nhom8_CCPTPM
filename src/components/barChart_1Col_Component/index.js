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

function BarChart_2Col_Component(props) {
    const { data, width, height, axis, legend} = props;

    return (
        <BarChart width={width} height={height} data={data}>
            {axis ? <XAxis dataKey="name" /> : null}
            {axis ? <YAxis /> : null}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {legend ? <Legend /> : null}
            <Bar dataKey="ok" stroke="#8884d8" fill="#8884d8" />
        </BarChart>
    );
}

export default BarChart_2Col_Component;
