import React from "react";
import Display from "./component/Display/Display";
import CalculatorButtonPanel from "./component/CalculatorButtonPanel/CalculatorButtonPanel";
import calculate from "./logic/calculate";
import { StyledDiv } from "./styled";

class BasicCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      next: null,
      operation: null
    };
  }

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  render() {
    return (
      <StyledDiv className="component-app">
        <Display value={this.state.next || this.state.total || "0"} />
        <CalculatorButtonPanel clickHandler={this.handleClick} />
      </StyledDiv>
    );
  }
}
export default BasicCalculator;
