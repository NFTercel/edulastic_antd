/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { StyledCheckbox } from "./styled";

export default class CardCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let isCheck = this.props.isCheck;
    return <StyledCheckbox checked={isCheck} onChange={this.onChange} />;
  }
}
