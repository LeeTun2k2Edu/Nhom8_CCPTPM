import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

function PieChartComponent(props) {
    const { data, width, height, legend, label } = props;
    const COLORS = ["#84dcc6", "#ff787b", "#C9E1ED", "#F9E7B3", "#9592AD"];

    let sum = 0;
    data.forEach((item) => {
        sum += item["value"];
    });
    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                label={
                    label
                        ? ({ name, value }) =>
                              `${name}: ${Math.round((value / sum) * 100)}%`
                        : null
                }
                startAngle={90}
                endAngle={450}
                outerRadius={80}
                fill="#8884d8"
                labelLine="false"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip />
            {legend ? <Legend /> : null}
        </PieChart>
    );
}

export default PieChartComponent;
