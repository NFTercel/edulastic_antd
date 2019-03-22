import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";
import { white } from "@edulastic/colors";
import CalculatorMenu from "./CalculatorMenu";

import { IconCursor, IconInRuler, IconCalculator, IconClose, IconProtactor, IconScratchPad } from "@edulastic/icons";

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 0
    };

    this.toolbarHandler = this.toolbarHandler.bind(this);
    this.handleCalculateMode = this.handleCalculateMode.bind(this);
  }

  toolbarHandler = value => {
    const { changeMode } = this.props;

    this.setState({ select: value });
    if (value === 5) {
      changeMode(true, value);
    } else {
      changeMode(false, value);
    }
  };

  handleCalculateMode = value => {
    this.setState({ select: 2 });

    const { changeCaculateMode } = this.props;
    changeCaculateMode(value);
  };

  componentDidMount() {}

  render() {
    const { select } = this.state;
    return (
      <Container>
        <StyledButton enable={select === 0} onClick={() => this.toolbarHandler(0)}>
          <CursorIcon />
        </StyledButton>

        <StyledButton enable={select === 1} onClick={() => this.toolbarHandler(1)}>
          <InRulerIcon />
        </StyledButton>

        <StyledButton enable={select === 2} onClick={() => this.toolbarHandler(2)}>
          <CaculatorIcon />
          {select == 2 && <CalculatorMenu changeCaculateMode={this.handleCalculateMode} />}
        </StyledButton>

        <StyledButton enable={select === 3} onClick={() => this.toolbarHandler(3)}>
          <CloseIcon />
        </StyledButton>

        <StyledButton enable={select === 4} onClick={() => this.toolbarHandler(4)}>
          <ProtactorIcon />
        </StyledButton>
        <StyledButton enable={select === 5} onClick={() => this.toolbarHandler(5)}>
          <ScratchPadIcon />
        </StyledButton>
      </Container>
    );
  }
}

ToolBar.propTypes = {
  changeMode: PropTypes.func.isRequired,
  changeCaculateMode: PropTypes.func.isRequired
};

export default ToolBar;

const Container = styled.div`
  margin-left: 60px;
`;

const customizeIcon = icon => styled(icon)`
  fill: ${white};
  margin-left: -3px;
  margin-top: 3px;
  &:hover {
    fill: ${white};
  }
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
  background: ${props => (props.enable ? "#00b0ff" : "transparent")};
  height: 40px;
  width: 40px;

  &:focus,
  &:hover {
    background: ${props => (props.enable ? "#00b0ff" : "transparent")};
  }
`;

const CursorIcon = customizeIcon(IconCursor);

const InRulerIcon = customizeIcon(IconInRuler);

const CaculatorIcon = customizeIcon(IconCalculator);

const CloseIcon = customizeIcon(IconClose);

const ProtactorIcon = customizeIcon(IconProtactor);

const ScratchPadIcon = customizeIcon(IconScratchPad);
