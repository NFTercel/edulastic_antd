/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { StyledCheckbox } from "./styled";

export default class CardCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.isCheck,
      studentId: this.props.studentId
    };
  }

  componentWillReceiveProps(props) {}

  onChange = e => {
    this.setState({
      checked: e.target.checked
    });
    this.props.changeCardCheck(e.target.checked, this.state.studentId);
  };

  render() {
    return <StyledCheckbox checked={this.state.checked} onChange={this.onChange} />;
  }
}
