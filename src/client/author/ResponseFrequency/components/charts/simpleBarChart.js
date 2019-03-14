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
  ResponsiveContainer,
  LabelList,
  Brush
} from "recharts";
import { StyledSimpleBarChart, StyledChartNavButton, StyledCustomChartTooltip, QuestionTypeHeading } from "../styled";
import { CustomChartXTick } from "./customChartXTick";
import colorRange1 from "../../static/json/colorRange1.json";

export class SimpleBarChart extends PureComponent {
  page = 7;

  state = {
    data: [],
    startIndex: 0,
    endIndex: this.page - 1
  };

  constructor(props) {
    super(props);

    this.constants = {
      COLOR_BLACK: "#010101",
      TICK_FILL: { fill: "#010101", fontWeight: "bold" },
      Y_AXIS_LABEL: { value: "Performance", angle: -90, position: "insideLeft", textAnchor: "middle" },
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
      let qCount = hmap[data].length;
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
      tmp.qCount = qCount;
      tmp.correct = Number(((tmp.corr_cnt / sum) * 100).toFixed(0));
      if (isNaN(tmp.correct)) tmp.correct = 0;
      tmp.incorrect = 100 - tmp.correct;
      tmp.fill = colorRange1[Math.floor(tmp.correct / 25)];
      tmp.assessment = nextProps.assessment.testName;
      return tmp;
    });
    return arr;
  }

  yTickFormatter = val => {
    return val + "%";
  };

  scrollLeft = () => {
    let diff;
    if (this.state.startIndex > 0) {
      if (this.state.startIndex - 0 >= this.page) {
        diff = this.page;
      } else {
        diff = this.state.startIndex;
      }
      this.setState({
        startIndex: this.state.startIndex - diff,
        endIndex: this.state.endIndex - diff,
        data: [...this.state.data]
      });
    }
  };

  scrollRight = () => {
    let diff;
    if (this.state.endIndex < this.state.data.length - 1) {
      if (this.state.data.length - 1 - this.state.endIndex >= this.page) {
        diff = this.page;
      } else {
        diff = this.state.data.length - 1 - this.state.endIndex;
      }
      this.setState({
        startIndex: this.state.startIndex + diff,
        endIndex: this.state.endIndex + diff,
        data: [...this.state.data]
      });
    }
  };

  getDataByIndex = index => {
    return this.state.data[index];
  };

  render() {
    return (
      <StyledSimpleBarChart className="chart-simple-bar-chart">
        <QuestionTypeHeading>
          Question Type performance for Assessment: {this.props.assessment.testName}
        </QuestionTypeHeading>
        <StyledChartNavButton
          type="primary"
          shape="circle"
          icon="left"
          size={"large"}
          className="navigator navigator-left"
          onClick={this.scrollLeft}
          style={{
            visibility: this.state.startIndex == 0 ? "hidden" : "visible"
          }}
        />
        <StyledChartNavButton
          type="primary"
          shape="circle"
          icon="right"
          size={"large"}
          className="navigator navigator-right"
          onClick={this.scrollRight}
          style={{
            visibility: this.state.data.length <= this.state.endIndex + 1 ? "hidden" : "visible"
          }}
        />
        <ResponsiveContainer width={"100%"} height={400}>
          <BarChart width={730} height={400} data={this.state.data}>
            <CartesianGrid vertical={false} strokeWidth={0.5} />
            <XAxis dataKey="name" tick={<CustomChartXTick getDataByIndex={this.getDataByIndex} />} interval={0} />
            <YAxis
              type={"number"}
              domain={[0, 110]}
              tick={this.constants.TICK_FILL}
              ticks={this.constants.ticks}
              tickFormatter={this.yTickFormatter}
              label={this.constants.Y_AXIS_LABEL}
            />
            <Tooltip cursor={false} content={<StyledCustomChartTooltip />} />
            <Brush
              dataKey="name"
              height={0}
              width={0}
              startIndex={this.state.startIndex}
              endIndex={this.state.endIndex}
            />
            <Bar dataKey="correct" stackId="a" unit={"%"} />
            <Bar dataKey="incorrect" stackId="a">
              <LabelList
                dataKey="correct"
                position="insideBottom"
                fill="#010101"
                offset={5}
                formatter={this.yTickFormatter}
              />
              {this.state.data.map((entry, index) => {
                return <Cell key={entry.name} fill={"#c0c0c0"} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </StyledSimpleBarChart>
    );
  }
}
