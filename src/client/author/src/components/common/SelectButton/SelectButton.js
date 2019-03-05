import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconCaretDown } from "@edulastic/icons";
import { textColor, white, blue } from "@edulastic/colors";
import SelectButtonItem from "./SelectButtonItem";

export default class SelectButton extends Component {
  state = {
    open: false
  };

  toggleList = () => {
    this.setState(({ open }) => ({
      open: !open
    }));
  };

  handleSelectItem = item => () => {
    const { onSelect } = this.props;
    onSelect(item.value);
    this.toggleList();
  };

  render() {
    const { options, icon, style } = this.props;
    const { open } = this.state;

    return (
      <SelectContainer style={style}>
        <Button onClick={this.toggleList} open={open}>
          <span>{icon}</span>
          <span>
            <IconCaretDown color={blue} width={11} height={6} />
          </span>
        </Button>
        {open && (
          <List>
            {options.map((item, index) => (
              <SelectButtonItem key={index} onClick={this.handleSelectItem(item)} icon={item.icon}>
                {item.label}
              </SelectButtonItem>
            ))}
          </List>
        )}
      </SelectContainer>
    );
  }
}

SelectButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  icon: PropTypes.any,
  style: PropTypes.object
};

SelectButton.defaultProps = {
  icon: null,
  style: {}
};

const SelectContainer = styled.div`
  position: relative;
  min-width: 85px;
`;

const Button = styled.button`
  padding: 0 10px;
  width: 100%;
  border-radius: 10px;
  border-bottom-left-radius: ${({ open }) => (open ? 0 : 10)};
  border-bottom-right-radius: ${({ open }) => (open ? 0 : 10)};
  background-color: ${white};
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  color: ${textColor};
  font-size: 14px;
  border: none;
  -webkit-appearance: none;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  outline: none;

  span {
    line-height: 1;
  }
  span:first-child {
    flex: 1;
    padding-top: 2px;
  }
`;

const List = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  background: ${white};
  z-index: 10000;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
`;
