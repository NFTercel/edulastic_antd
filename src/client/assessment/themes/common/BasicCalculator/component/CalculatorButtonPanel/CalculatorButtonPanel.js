import CalculatorButton from "../CalculatorButton/CalculatorButton";
import React from "react";
import PropTypes from "prop-types";

import { StyledDiv, StyledDivF } from "./styled";

class CalculatorButtonPanel extends React.Component {
  handleClick = buttonName => {
    this.props.clickHandler(buttonName);
  };

  render() {
    return (
      <StyledDiv>
        <StyledDivF>
          <CalculatorButton name="AC" clickHandler={this.handleClick} />
          <CalculatorButton name="+/-" clickHandler={this.handleClick} />
          <CalculatorButton name="%" clickHandler={this.handleClick} />
          <CalculatorButton name="÷" clickHandler={this.handleClick} orange />
        </StyledDivF>
        <StyledDivF>
          <CalculatorButton name="7" clickHandler={this.handleClick} />
          <CalculatorButton name="8" clickHandler={this.handleClick} />
          <CalculatorButton name="9" clickHandler={this.handleClick} />
          <CalculatorButton name="x" clickHandler={this.handleClick} orange />
        </StyledDivF>
        <StyledDivF>
          <CalculatorButton name="4" clickHandler={this.handleClick} />
          <CalculatorButton name="5" clickHandler={this.handleClick} />
          <CalculatorButton name="6" clickHandler={this.handleClick} />
          <CalculatorButton name="-" clickHandler={this.handleClick} orange />
        </StyledDivF>
        <StyledDivF>
          <CalculatorButton name="1" clickHandler={this.handleClick} />
          <CalculatorButton name="2" clickHandler={this.handleClick} />
          <CalculatorButton name="3" clickHandler={this.handleClick} />
          <CalculatorButton name="+" clickHandler={this.handleClick} orange />
        </StyledDivF>
        <StyledDivF>
          <CalculatorButton name="0" clickHandler={this.handleClick} wide />
          <CalculatorButton name="." clickHandler={this.handleClick} />
          <CalculatorButton name="=" clickHandler={this.handleClick} orange />
        </StyledDivF>
      </StyledDiv>
    );
  }
}
CalculatorButtonPanel.propTypes = {
  clickHandler: PropTypes.func
};
export default CalculatorButtonPanel;
