import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Dropdown, message, Menu } from "antd";
import moment from "moment";
import { withNamespaces } from "@edulastic/localization";
import Assigned from "../../Assets/assigned.svg";
import classBoard from "../../Assets/presentation.svg";
import { Link } from "react-router-dom";

import {
  Container,
  StyledTitle,
  StyledLink,
  StyledAssignName,
  StyledParaFirst,
  SpaceD,
  StyledParaSecond,
  StyledPopconfirm,
  StyledDiv,
  StyledTabs,
  StyledAnchor,
  StyledAnchorA,
  Img,
  StyledDropdown
} from "./styled";

import { releaseScoreAction } from "../../../src/actions/classBoard";
import { showScoreSelector } from "../../../ClassBoard/ducks";

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
    if (this.state.condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  };

  handleReleaseScore = () => {
    const { classId, assignmentId, setReleaseScore, showScore } = this.props;
    const isReleaseScore = !showScore;
    setReleaseScore(assignmentId, classId, isReleaseScore);
    this.toggleDropdown();
  };

  handlePrintStudentResponse = () => {
    this.props.printStudentResponse();
  };

  render() {
    const { t, active, assignmentId, classId, testActivityId, additionalData = {}, showScore } = this.props;
    const endDate = additionalData.endDate;
    const dueDate = isNaN(endDate) ? new Date(endDate) : new Date(parseInt(endDate));

    const menu = (
      <Menu>
        <Menu.Item key={"1"}>Mark as Done</Menu.Item>
        <Menu.Item
          key={"2"}
          onClick={this.handleReleaseScore}
          style={{ textDecoration: showScore ? "line-through" : "none" }}
        >
          Release Score
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`/author/printpreview/${testActivityId}`}>Print</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Container>
        <StyledTitle>
          <StyledAssignName>{additionalData.testName}</StyledAssignName>
          <StyledParaFirst>{additionalData.className || "loading..."}</StyledParaFirst>
          <StyledParaSecond>
            Done(Due on {additionalData.endDate && moment(dueDate).format("D MMMM YYYY")})
          </StyledParaSecond>
        </StyledTitle>
        <StyledTabs>
          <StyledAnchor isActive={active === "summary"}>
            <StyledLink isActive={active === "summary"} to={`/author/summary/${assignmentId}/${classId}`}>
              <Img src={classBoard} />
              <SpaceD />
              SUMMARY
            </StyledLink>
          </StyledAnchor>

          <StyledAnchor isActive={active === "classboard"}>
            <StyledLink isActive={active === "classboard"} to={`/author/classboard/${assignmentId}/${classId}`}>
              <Img src={classBoard} />
              <SpaceD />
              {t("common.liveClassBoard")}
            </StyledLink>
          </StyledAnchor>
          <StyledAnchor isActive={active === "expressgrader"}>
            <StyledLink
              isActive={active === "expressgrader"}
              to={`/author/expressgrader/${assignmentId}/${classId}/${testActivityId}`}
            >
              <Img src={Assigned} />
              <SpaceD />
              {t("common.expressGrader")}
            </StyledLink>
          </StyledAnchor>
          <StyledAnchor>
            <StyledLink to={`/author/standardsBasedReport/${this.props.assignmentId}/${this.props.classId}`}>
              <Img src={Assigned} />
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
          <StyledDropdown overlay={menu} trigger={["click"]}>
            <StyledAnchorA className="ant-dropdown-link" href="#">
              ... More
            </StyledAnchorA>
          </StyledDropdown>
        </StyledDiv>
      </Container>
    );
  }
}

ClassHeader.propTypes = {};

const enhance = compose(
  withNamespaces("classBoard"),
  connect(
    state => ({
      showScore: showScoreSelector(state)
    }),
    {
      setReleaseScore: releaseScoreAction
    }
  )
);

export default enhance(ClassHeader);
