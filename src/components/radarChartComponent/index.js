import React from "react";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
    Tooltip,
} from "recharts";

function RadarChartComponent(props) {
    const { data, width, height, axis, legend } = props;
    return (
        <RadarChart width={width} height={height} data={data}>
            <PolarGrid />
            {axis ? <PolarAngleAxis dataKey="subject" /> : null}
            {axis ? <PolarRadiusAxis /> : null}
            <Radar
                name="pv"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
            <Radar
                name="pv"
                dataKey="pv"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
            />
            <Tooltip />
            {legend ? <Legend /> : null}
        </RadarChart>
    );
}

export default RadarChartComponent;
