import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

function PieChartComponent(props) {
    const { data, width, height, legend, label } = props;
    const COLORS = ["#EAB9B4", "#F9E7B3", "#9592AD", "#C9E1ED", "#B0D8CA"];
    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                label={label?({ name, value }) => `${name}-${value}`:null}
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
            {legend?<Legend/>:null}
        </PieChart>
    );
}

export default PieChartComponent;
