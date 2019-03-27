import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyledCollapseButton } from "./styled";

class CollapseButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClickButton = e => {
    const isCollapse = !this.props.collapsed;
    this.props.handleClickCollapse(isCollapse);
  };

  render() {
    return <StyledCollapseButton onClick={this.handleClickButton}>&middot;&middot;&middot;</StyledCollapseButton>;
  }
}

export default CollapseButton;

CollapseButton.propTypes = {
  handleClickCollapse: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired
};
