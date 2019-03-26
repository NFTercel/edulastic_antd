/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { Component } from "react";
import BarGraph from "../BarGraph/BarGraph";

import { StyledProgress, StyledDiv, StyledDivF, StyledProgressDiv, GraphText, GraphDescription } from "./styled";

// eslint-disable-next-line no-trailing-spaces
export default class Graph extends Component {
  render() {
    const { gradebook } = this.props;
    const submittedNum = gradebook.submittedNumber;
    const totalNum = gradebook.total;
    const percentage = Math.round((submittedNum / totalNum) * 100);
    return (
      <StyledDiv>
        <StyledDivF>
          <StyledProgressDiv>
            <StyledProgress
              className="getProgress"
              strokeLinecap="square"
              type="circle"
              percent={percentage}
              width={167}
              strokeWidth={15}
              strokeColor="#00b0ff"
              format={percent => `${percent}%`}
            />
            <GraphDescription>average score %</GraphDescription>
          </StyledProgressDiv>
          <GraphText>
            <p>
              {this.props.gradebook.submittedNumber} out of {this.props.gradebook.total} Submitted
            </p>
            <p>({this.props.gradebook.total - this.props.gradebook.submittedNumber} Absent)</p>
          </GraphText>
        </StyledDivF>
        <BarGraph gradebook={gradebook} />
      </StyledDiv>
    );
  }
}
