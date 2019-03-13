/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { compose } from "redux";
import { Popconfirm, Switch, message } from "antd";
import moment from "moment";
import { withNamespaces } from "@edulastic/localization";
import Assigned from "../../Assets/assigned.svg";

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
  StyledAnchor
} from "./styled";

class ClassHeader extends Component {
  constructor(props) {
    super(props);
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
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  };

  render() {
    const { t, active, assignmentId, classId, testActivityId, additionalData = {} } = this.props;
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
          <StyledAnchor isActive={active === "classboard"}>
            <StyledLink isActive={active === "classboard"} to={`/author/classboard/${assignmentId}/${classId}`}>
              <img src={Assigned} />
              <SpaceD />
              {t("common.liveClassBoard")}
            </StyledLink>
          </StyledAnchor>
          <StyledAnchor isActive={active === "expressgrader"}>
            <StyledLink
              isActive={active === "expressgrader"}
              to={`/author/expressgrader/${assignmentId}/${classId}/${testActivityId}`}
            >
              <img src={Assigned} />
              <SpaceD />
              {t("common.expressGrader")}
            </StyledLink>
          </StyledAnchor>
          <StyledAnchor isActive={active === "reports"}>
            <img src={Assigned} />
            <SpaceD />
            {t("common.reports")}
          </StyledAnchor>
          <StyledAnchor>
            <StyledLink to={`/author/standardsBasedReport/${this.props.assignmentId}/${this.props.classId}`}>
              <img src={Assigned} />
              <SpaceD />
              {t("common.standardBasedReports")}
            </StyledLink>
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

ClassHeader.propTypes = {};

const enhance = compose(withNamespaces("classBoard"));

export default enhance(ClassHeader);
