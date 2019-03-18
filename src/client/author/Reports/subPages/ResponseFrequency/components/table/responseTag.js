import React from "react";
import { Component } from "react";

import { StyledResponseTagContainer } from "../styled";

export class ResponseTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledResponseTagContainer>
        <div
          className={
            this.props.data.name === "Correct"
              ? "table-tag table-tag-correct"
              : this.props.data.name === "Skip"
              ? "table-tag"
              : Number(this.props.data.value) > this.props.incorrectFrequencyThreshold
              ? "table-tag table-tag-warn"
              : "table-tag"
          }
        >
          {<p>{this.props.data.name}</p>}
          <p>{this.props.data.value}%</p>
        </div>
      </StyledResponseTagContainer>
    );
  }
}
