/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { message } from "antd";
import moment from "moment";
import Assigned from "../../assets/assigned.svg";

import {
  Container,
  StyledTitle,
  StyledLink,
  StyledParaFirst,
  SpaceD,
  StyledParaSecond,
  StyledParaThird,
  StyledPopconfirm,
  StyledSwitch,
  StyledDiv,
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
    const { additionalData } = this.props;
    const endDate = additionalData.endDate;
    const dueDate = isNaN(endDate) ? new Date(endDate) : new Date(parseInt(endDate));

    return (
      <Container>
        <StyledTitle>
          <StyledParaFirst>{additionalData.className || "loading..."}</StyledParaFirst>
          <StyledParaSecond>
            (Due on {additionalData.endDate && moment(dueDate).format("MMMM Do YYYY")})
          </StyledParaSecond>
        </StyledTitle>
        <StyledTabs>
          <StyledAnchorA>
            <StyledLink to="/author/classboard">
              <img src={Assigned} />
              <SpaceD />
              LIVE CLASS BOARD
            </StyledLink>
          </StyledAnchorA>
          <StyledAnchor>
            <StyledLink to="/author/expressgrader">
              <img src={Assigned} />
              <SpaceD />
              EXPRESS GRADER
            </StyledLink>
          </StyledAnchor>
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
