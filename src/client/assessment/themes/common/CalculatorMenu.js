import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";
import { white } from "@edulastic/colors";
import { IconCalculator } from "@edulastic/icons";

class CalculatorMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: `${this.props.calcType}_${this.props.calcBrands[0]}`
    };
    this.calculatorMenuHandler = this.calculatorMenuHandler.bind(this);
  }

  calculatorMenuHandler = (e, value) => {
    e.stopPropagation();
    const { changeCaculateMode } = this.props;
    this.setState({ select: value });
    changeCaculateMode(value);
  };

  render() {
    const { select } = this.state;
    const { calcType, calculatorTypes, calcBrands } = this.props;
    return (
      <Container>
        {Object.keys(calculatorTypes).map(
          item =>
            calcType === item && (
              <React.Fragment>
                <StyledButton
                  enable={select === `${item}_${calcBrands[0]}`}
                  onClick={e => this.calculatorMenuHandler(e, `${item}_${calcBrands[0]}`)}
                >
                  <CaculatorIcon />
                </StyledButton>
                <StyledButton
                  enable={select === `${item}_${calcBrands[1]}`}
                  onClick={e => this.calculatorMenuHandler(e, `${item}_${calcBrands[1]}`)}
                >
                  <CaculatorIcon />
                </StyledButton>
              </React.Fragment>
            )
        )}
      </Container>
    );
  }
}

CalculatorMenu.propTypes = {
  changeCaculateMode: PropTypes.func.isRequired
};

export default CalculatorMenu;

const Container = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  background-color: #0288d1;
  border: 1px solid ${white};
  left: -24px;
  top: 50px;
  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #0288d1 transparent;
    top: -8px;
    left: 34px;
  }

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 9px 9px 9px;
    border-color: transparent transparent #ffffff transparent;
    top: -10px;
    left: 33px;
  }
`;

const customizeIcon = icon => styled(icon)`
  fill: ${white};
  &:hover {
    fill: ${white};
  }
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
  background: ${props => (props.enable ? "#00b0ff" : "transparent")};
  height: 30px;
  width: 30px;
  padding: 7px;

  &:focus,
  &:hover {
    background: ${props => (props.enable ? "#00b0ff" : "transparent")};
  }
  &:last-child {
    margin-right: 0;
  }
`;

const CaculatorIcon = customizeIcon(IconCalculator);
