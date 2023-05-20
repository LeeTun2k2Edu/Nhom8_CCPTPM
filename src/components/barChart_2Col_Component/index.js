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
            <Bar dataKey="ok" stroke="#A8E6B9" fill="#A8E6B9" />
            <Bar dataKey="fail" stroke="#FfB6BA" fill="#FfB6BA" />
        </BarChart>
    );
}

export default BarChart_2Col_Component;
