import React, { Component } from "react";
import PropTypes from "prop-types";
import BarGraph from "../BarGraph/BarGraph";

import { StyledProgress, StyledDiv, StyledProgressDiv, GraphInfo, GraphDescription } from "./styled";

export default class Graph extends Component {
  static propTypes = {
    gradebook: PropTypes.object.isRequired
  };

  render() {
    const { gradebook } = this.props;
    const submittedNum = gradebook.submittedNumber;
    const totalNum = gradebook.total;
    const percentage = Math.round((submittedNum / totalNum) * 100);
    return (
      <StyledDiv>
        <div>
          <StyledProgressDiv>
            {
              // TODO: need to implement gradient stoke color
            }
            <StyledProgress
              className="getProgress"
              strokeLinecap="square"
              type="circle"
              percent={percentage}
              width={167}
              strokeWidth={8}
              strokeColor="#2B7FF0"
              format={percent => `${percent}%`}
            />
            <GraphDescription>average score %</GraphDescription>
          </StyledProgressDiv>
          <GraphInfo>
            {gradebook.submittedNumber} out of {gradebook.total} Submitted
            {/* <p>({gradebook.total - gradebook.submittedNumber} Absent)</p> */}
          </GraphInfo>
        </div>
        <BarGraph gradebook={gradebook} />
      </StyledDiv>
    );
  }
}
