import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyledCollapseButton } from "./styled";

class CollapseButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed
    };
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleClickButton = e => {
    this.setState({
      collapsed: !this.state.collapsed
    });
    this.props.handleClickCollapse(this.state.collapsed);
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
