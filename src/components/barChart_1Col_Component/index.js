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

function BarChart_1Col_Component(props) {
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
            <Bar dataKey="statistic_predict_results" stroke="#8884d8" fill="#8884d8" />
        </BarChart>
    );
}

export default BarChart_1Col_Component;
