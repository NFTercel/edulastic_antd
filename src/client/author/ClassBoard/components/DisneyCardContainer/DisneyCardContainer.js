import React, { Component } from "react";
import DisneyCard from "./DisneyCard/DisneyCard";

import { StyledCardContiner, StyledDiv, StyledPagination } from "./styled";

export default class DisneyCardContainer extends Component {
  constructor(props) {
    super(props);
    let { testActivity, assignmentId, classId } = this.props;
    this.state = {
      minValue: 0,
      maxValue: 4
    };
  }

  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 4
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 4
      });
    }
  };

  render() {
    let { testActivity, assignmentId, classId } = this.props;
    let totalCount = 0;
    return (
      <StyledCardContiner>
        <StyledDiv>
          {testActivity && testActivity.length > 0 && (
            <DisneyCard
              testActivity={testActivity.slice(this.state.minValue, this.state.maxValue)}
              assignmentId={assignmentId}
              classId={classId}
            />
          )}
        </StyledDiv>
        <StyledPagination
          defaultCurrent={1}
          defaultPageSize={4}
          onChange={this.handleChange}
          total={testActivity && testActivity.length > 0 ? testActivity.length : 0}
        />
      </StyledCardContiner>
    );
  }
}
