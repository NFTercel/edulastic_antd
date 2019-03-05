import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";
import { white } from "@edulastic/colors";
import { IconCursor, IconInRuler, IconCalculator, IconClose, IconProtactor, IconScratchPad } from "@edulastic/icons";

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 0
    };
  }

  toolbarHandler = value => {
    const { changeMode } = this.props;

    this.setState({ select: value });
    if (value === 5) {
      changeMode(true);
    } else {
      changeMode(false);
    }
  };

  render() {
    const { select } = this.state;
    return (
      <Container>
        <StyledButton enable={select === 0 && true} onClick={() => this.toolbarHandler(0)}>
          <CursorIcon />
        </StyledButton>

        <StyledButton enable={select === 1 && true} onClick={() => this.toolbarHandler(1)}>
          <InRulerIcon />
        </StyledButton>

        <StyledButton enable={select === 2 && true} onClick={() => this.toolbarHandler(2)}>
          <CaculatorIcon />
        </StyledButton>

        <StyledButton enable={select === 3 && true} onClick={() => this.toolbarHandler(3)}>
          <CloseIcon />
        </StyledButton>

        <StyledButton enable={select === 4 && true} onClick={() => this.toolbarHandler(4)}>
          <ProtactorIcon />
        </StyledButton>
        <StyledButton enable={select === 5 && true} onClick={() => this.toolbarHandler(5)}>
          <ScratchPadIcon />
        </StyledButton>
      </Container>
    );
  }
}

ToolBar.propTypes = {
  changeMode: PropTypes.func.isRequired
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
