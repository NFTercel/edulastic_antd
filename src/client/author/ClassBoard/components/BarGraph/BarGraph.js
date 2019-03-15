import React, { Component } from "react";
import PropTypes from "prop-types";

import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { MainDiv } from "./styled";

export default class BarGraph extends Component {
  render() {
    const itemsSum = this.props.gradebook.itemsSummary;

    let data = [];
    if (itemsSum) {
      itemsSum.map((item, index) => {
        data.push({
          name: `Q${index + 1}`,
          green: item.correctNum !== 0 ? item.correctNum : 0,
          yellow: item.partialNum !== 0 ? item.partialNum : 0,
          red: item.wrongNum !== 0 && !item.skippedNum ? item.wrongNum : 0,
          all: (item.wrongNum || 0) + (item.correctNum || 0) + (item.partialNum || 0),
          darkGrey: item.wrongNum === item.attemptsNum && item.skippedNum !== 0 ? item.attemptsNum : 0,
          lightGrey: item.wrongNum !== item.attemptsNum && item.skippedNum !== 0 ? item.skippedNum : 0
        });
      });
    }
    return (
      <MainDiv className="studentBarChart">
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart barGap={1} barSize={36} data={data}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickSize={0}
              dy={8}
              tick={{ fontSize: "10px", strokeWidth: 2, fill: "#434b5d" }}
            />
            <YAxis
              dataKey="all"
              yAxisId={0}
              tickCount={4}
              allowDecimals={false}
              tick={{ fontSize: "10px", strokeWidth: 0, fill: "#b1b1b1" }}
              tickSize={6}
              label={{ value: "ATTEMPTS", angle: -90, fill: "#b1b1b1", fontSize: "10px" }}
              stroke="#b1b1b1"
            />
            <YAxis
              dataKey="all"
              yAxisId={1}
              tickCount={4}
              allowDecimals={false}
              tick={{ strokeWidth: 0, fill: "#b1b1b1", fontSize: "10px" }}
              tickSize={6}
              label={{ value: "AVG TIME (SECONDS)", angle: -90, fill: "#b1b1b1", fontSize: "10px" }}
              orientation="right"
              stroke="#b1b1b1"
            />
            <Bar stackId="a" dataKey="green" fill="#1fe3a0" />
            <Bar stackId="a" dataKey="yellow" fill="#fdcc3a" />
            <Bar stackId="a" dataKey="red" fill="#ee1b82" />
            <Bar stackId="a" dataKey="lightGrey" fill="#f5f5f5" />
            <Bar stackId="a" dataKey="darkGrey" fill="#e5e5e5" />
            <Line
              dataKey="green"
              stroke="#1baae9"
              strokeWidth="3"
              dot={{ stroke: "#1baae9", strokeWidth: 5, fill: "#1baae9" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </MainDiv>
    );
  }
}
