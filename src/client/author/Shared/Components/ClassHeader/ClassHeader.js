import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { message, Menu } from "antd";
import moment from "moment";
import { withNamespaces } from "@edulastic/localization";
import {
  IconSummaryBoard,
  IconDeskTopMonitor,
  IconBookMarkButton,
  IconNotes,
  IconMoreVertical
} from "@edulastic/icons";

import {
  Container,
  StyledTitle,
  StyledLink,
  StyledParaFirst,
  LinkLabel,
  StyledParaSecond,
  StyledPopconfirm,
  StyledDiv,
  StyledTabs,
  StyledAnchor,
  StyledButton,
  MenuWrapper
} from "./styled";

import { releaseScoreAction } from "../../../src/actions/classBoard";
import { showScoreSelector } from "../../../ClassBoard/ducks";

class ClassHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      condition: true, // Whether meet the condition, if not show popconfirm.
      showDropdown: false
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
    const { condition } = this.state;
    // Determining condition before show the popconfirm.
    if (condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  };

  toggleDropdown = () => {
    this.setState(state => ({ showDropdown: !state.showDropdown }));
  };

  handleReleaseScore = () => {
    const { classId, assignmentId, setReleaseScore, showScore } = this.props;
    const isReleaseScore = !showScore;
    setReleaseScore(assignmentId, classId, isReleaseScore);
    this.toggleDropdown();
  };

  render() {
    const { t, active, assignmentId, classId, testActivityId, additionalData = {}, showScore } = this.props;
    const { showDropdown, visible } = this.state;
    const { endDate } = additionalData;
    const dueDate = Number.isNaN(endDate) ? new Date(endDate) : new Date(parseInt(endDate, 10));

    return (
      <Container>
        <StyledTitle>
          <StyledParaFirst>{additionalData.className || "loading..."}</StyledParaFirst>
          <StyledParaSecond>
            Done(Due on {additionalData.endDate && moment(dueDate).format("D MMMM YYYY")})
          </StyledParaSecond>
        </StyledTitle>
        <StyledTabs>
          <StyledAnchor isActive={active === "summary"}>
            <StyledLink to={`/author/summary/${assignmentId}/${classId}`}>
              <IconSummaryBoard color={active === "summary" ? "#FFFFFF" : "#bed8fa"} left={0} />
              <LinkLabel>{t("common.summaryBoard")}</LinkLabel>
            </StyledLink>
          </StyledAnchor>
          <StyledAnchor isActive={active === "classboard"}>
            <StyledLink to={`/author/classboard/${assignmentId}/${classId}`}>
              <IconDeskTopMonitor color={active === "classboard" ? "#FFFFFF" : "#bed8fa"} left={0} />
              <LinkLabel>{t("common.liveClassBoard")}</LinkLabel>
            </StyledLink>
          </StyledAnchor>
          <StyledAnchor isActive={active === "expressgrader"}>
            <StyledLink to={`/author/expressgrader/${assignmentId}/${classId}/${testActivityId}`}>
              <IconBookMarkButton color={active === "expressgrader" ? "#FFFFFF" : "#bed8fa"} left={0} />
              <LinkLabel>{t("common.expressGrader")}</LinkLabel>
            </StyledLink>
          </StyledAnchor>
          <StyledAnchor isActive={active === "standard_report"}>
            <StyledLink to={`/author/standardsBasedReport/${assignmentId}/${classId}`}>
              <IconNotes color={active === "standard_report" ? "#FFFFFF" : "#bed8fa"} left={0} />
              <LinkLabel>{t("common.standardBasedReports")}</LinkLabel>
            </StyledLink>
          </StyledAnchor>
        </StyledTabs>
        <StyledDiv>
          <StyledPopconfirm
            visible={visible}
            onVisibleChange={this.handleVisibleChange}
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          />
          <StyledButton onClick={this.toggleDropdown}>
            <IconMoreVertical color="#FFFFFF" />
          </StyledButton>
          {showDropdown && (
            <MenuWrapper>
              <Menu>
                <Menu.Item key="1">Mark as Done</Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={this.handleReleaseScore}
                  style={{ textDecoration: showScore ? "line-through" : "none" }}
                >
                  Release Score
                </Menu.Item>
              </Menu>
            </MenuWrapper>
          )}
        </StyledDiv>
      </Container>
    );
  }
}

ClassHeader.propTypes = {
  t: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  assignmentId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  testActivityId: PropTypes.string,
  additionalData: PropTypes.object.isRequired,
  setReleaseScore: PropTypes.func.isRequired,
  showScore: PropTypes.bool
};

ClassHeader.defaultProps = {
  testActivityId: "",
  showScore: false
};

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
