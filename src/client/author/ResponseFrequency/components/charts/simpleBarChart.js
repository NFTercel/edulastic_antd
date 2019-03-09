import React from "react";
import { PureComponent } from "react";
import { groupBy } from "lodash";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";
import { StyledSimpleBarChart } from "../styled";
import colorRange1 from "../../static/json/colorRange1.json";

export class SimpleBarChart extends PureComponent {
  state = {
    data: []
  };

  constructor(props) {
    super(props);

    this.constants = {
      COLOR_BLACK: "#010101",
      TICK_FILL: { fill: "#010101", fontWeight: "bold" },
      Y_AXIS_LABEL: { value: "Percentage", angle: -90, position: "insideLeft", textAnchor: "middle" },
      ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      colors: colorRange1
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let arr = SimpleBarChart.parseData(nextProps);
    return { data: [...arr] };
  }

  static parseData(nextProps) {
    let hmap = groupBy(nextProps.data, "qType");

    let arr = Object.keys(hmap).map((data, i) => {
      let tmp = hmap[data].reduce(
        (total, currentValue, currentIndex) => {
          let { corr_cnt = 0, incorr_cnt = 0, skip_cnt = 0, part_cnt = 0 } = currentValue;
          return {
            corr_cnt: total.corr_cnt + corr_cnt,
            incorr_cnt: total.incorr_cnt + incorr_cnt,
            skip_cnt: total.skip_cnt + skip_cnt,
            part_cnt: total.part_cnt + part_cnt
          };
        },
        { corr_cnt: 0, incorr_cnt: 0, skip_cnt: 0, part_cnt: 0 }
      );

      let sum = tmp.corr_cnt + tmp.incorr_cnt + tmp.skip_cnt + tmp.part_cnt;
      tmp.name = data;
      tmp.correct = ((tmp.corr_cnt / sum) * 100).toFixed(2);
      tmp.incorrect = 100 - ((tmp.corr_cnt / sum) * 100).toFixed(2);
      return tmp;
    });
    return arr;
  }

  yTickFormatter = val => {
    return val + "%";
  };

  xTickFormatter = val => {
    if (val.length > 12) {
      return val.substring(0, 12) + "...";
    } else {
      return val;
    }
  };

  render() {
    return (
      <StyledSimpleBarChart className="chart-simple-bar-chart">
        <ResponsiveContainer width={"100%"} height={400}>
          <BarChart width={730} height={250} data={this.state.data}>
            <CartesianGrid vertical={false} strokeWidth={0.5} />
            <XAxis dataKey="name" tick={this.constants.TICK_FILL} tickFormatter={this.xTickFormatter} />
            <YAxis
              type={"number"}
              domain={[0, 110]}
              tick={this.constants.TICK_FILL}
              ticks={this.constants.ticks}
              tickFormatter={this.yTickFormatter}
              label={this.constants.Y_AXIS_LABEL}
            />
            <Tooltip cursor={false} />
            <Bar dataKey="correct" stackId="a" unit={"%"}>
              {this.state.data.map((entry, index) => {
                return <Cell key={index} fill={this.constants.colors[Math.floor(entry.correct / 25)]} />;
              })}
            </Bar>
            <Bar dataKey="incorrect" stackId="a" fill={"#c0c0c0"}>
              <LabelList
                dataKey="correct"
                position="insideBottom"
                fill="#010101"
                offset={5}
                formatter={this.yTickFormatter}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </StyledSimpleBarChart>
    );
  }
}
