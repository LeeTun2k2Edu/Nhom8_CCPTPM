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

    const ok = data.ok
    const fail = data.fail

    console.log(ok, fail)

    return (
        <BarChart width={width} height={height} data={data}>
            {axis ? <XAxis dataKey="name" /> : null}
            {axis ? <YAxis /> : null}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {legend ? <Legend /> : null}
            <Bar dataKey="ok" stroke="#7fb15f" fill="#7fb15f" />
            <Bar dataKey="fail" stroke="#D8858A" fill="#D8858A" />
        </BarChart>
    );
}

export default BarChart_2Col_Component;
