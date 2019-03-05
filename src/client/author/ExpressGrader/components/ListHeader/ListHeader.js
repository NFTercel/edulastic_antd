/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "redux";
import { darkBlueSecondary, white } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";
import { Popconfirm, Switch, message } from "antd";
import { Link } from "react-router-dom";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";

import Assigned from "../../../src/assets/assignments/assigned.svg";

import {
  SpaceD,
  Container,
  StyledTitle,
  StyledParaFirst,
  StyledParaThird,
  StyledParaSecond,
  StyledPopconfirm,
  StyledSwitch,
  StyledDiv,
  StyledLink,
  StyledTabs,
  StyledAnchorA,
  StyledAnchor
} from "./styled";

class ListHeader extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      condition: true // Whether meet the condition, if not show popconfirm.
    };
  }

  changeCondition = value => {
    this.setState({ condition: value });
  };

  confirm = () => {
    this.setState({ visible: false });
    message.success("Next step.");
  };

  cancel = () => {
    this.setState({ visible: false });
    message.error("Click on cancel.");
  };

  handleVisibleChange = visible => {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    // Determining condition before show the popconfirm.
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.state.condition);
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  };

  render() {
    return (
      <Container>
        <StyledTitle>
          <StyledParaFirst>Class 1</StyledParaFirst>
          <StyledParaSecond>Done (Due on 26 October, 2018)</StyledParaSecond>
        </StyledTitle>
        <StyledTabs>
          <StyledAnchor>
            <StyledLink to={`/author/classboard/${this.props.assignmentId}/${this.props.classId}`}>
              <img src={Assigned} />
              <SpaceD />
              LIVE CLASS BOARD
            </StyledLink>
          </StyledAnchor>
          <StyledAnchorA>
            <StyledLink to={`/author/expressgrader/${this.props.assignmentId}/${this.props.classId}`}>
              <img src={Assigned} />
              <SpaceD />
              EXPRESS GRADER
            </StyledLink>
          </StyledAnchorA>
          <StyledAnchor>
            <img src={Assigned} />
            <SpaceD />
            REPORTS
          </StyledAnchor>
        </StyledTabs>
        <StyledDiv>
          <StyledPopconfirm
            // eslint-disable-next-line react/destructuring-assignment
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          />
          <StyledParaThird>Release Scores</StyledParaThird>
          <StyledSwitch defaultChecked onChange={this.changeCondition} />
        </StyledDiv>
      </Container>
    );
  }
}

ListHeader.propTypes = {};

const enhance = compose(withNamespaces("author"));

export default enhance(ListHeader);

// const HeaderWrapper = styled.div`
//   padding-top: 62px;
//   margin-bottom: 10px;
// `;
