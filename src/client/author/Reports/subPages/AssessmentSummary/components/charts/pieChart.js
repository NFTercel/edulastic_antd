import React, { useState, useEffect, useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip } from "recharts";
import { fadedBlack } from "@edulastic/colors";

export const SimplePieChart = props => {
  const renderCustomizedLabel = args => {
    const RADIAN = Math.PI / 180;
    let { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = args;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill={fadedBlack} textAnchor={"middle"} dominantBaseline="central" fontSize={"11px"}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const chartData = useMemo(() => {
    let arr = [];
    if (props.data) {
      for (let i = 0; i < props.data.length; i++) {
        arr.push({
          bandPerf: props.data[i].bandPerf,
          fill: props.data[i].color,
          name: props.data[i].masteryName
        });
      }
    }
    return arr;
  }, [props.data]);

  return (
    <ResponsiveContainer width={"100%"}>
      <PieChart>
        <Legend layout="vertical" align="left" verticalAlign="middle" />
        <Tooltip cursor={false} />
        <Pie
          name={"name"}
          data={chartData}
          labelLine={false}
          outerRadius={80}
          dataKey="bandPerf"
          label={renderCustomizedLabel}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
