import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
// actions
import {
  receiveTestActivitydAction,
  receiveGradeBookdAction,
  receiveClassResponseAction
} from "../../../src/actions/classBoard";
import QuestionContainer from "../../../QuestionView";
// ducks
import {
  getTestActivitySelector,
  getGradeBookSelector,
  getAdditionalDataSelector,
  getClassResponseSelector
} from "../../ducks";
// components
import Score from "../Score/Score";
import DisneyCard from "../DisneyCard/DisneyCard";
import Graph from "../ProgressGraph/ProgressGraph";
import ClassSelect from "../../../Shared/Components/ClassSelect/ClassSelect";
import ClassHeader from "../../../Shared/Components/ClassHeader/ClassHeader";
import HooksContainer from "../HooksContainer/HooksContainer";
// icon images
import More from "../../assets/more.svg";
import Stats from "../../assets/stats.svg";
import Ghat from "../../assets/graduation-hat.svg";
import Ptools from "../../assets/printing-tool.svg";
import Elinks from "../../assets/external-link.svg";
// styled wrappers
import {
  Anchor,
  BarDiv,
  SpaceDiv,
  ButtonSpace,
  AnchorLink,
  StyledAnc,
  StyledCard,
  StyledButton,
  StyledCheckbox,
  PaginationInfo,
  CheckContainer,
  ButtonGroup,
  StyledFlexContainer,
  StudentButton,
  QuestionButton
} from "./styled";

class ClassBoard extends Component {
  constructor(props) {
    super(props);
    this.changeStateTrue = this.changeStateTrue.bind(this);
    this.changeStateFalse = this.changeStateFalse.bind(this);
    this.state = {
      flag: true,
      selectedTab: "Student"
    };
  }

  componentDidMount() {
    const { loadGradebook, loadTestActivity, match } = this.props;
    const { assignmentId, classId } = match.params;
    loadGradebook(assignmentId, classId);
    loadTestActivity(assignmentId, classId);
  }

  componentDidUpdate(_, prevState) {
    const { loadClassResponses, additionalData: { testId } = {} } = this.props;
    const { testId: prevTestId } = prevState;
    if (testId !== prevTestId) {
      loadClassResponses({ testId });
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { additionalData: { testId } = {} } = props;
    if (testId !== state.testId) {
      return { testId };
    }
    return null;
  }

  changeStateTrue() {
    this.setState({
      flag: true
    });
  }

  changeStateFalse() {
    this.setState({
      flag: false
    });
  }

  handleCreate = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  getTestActivity = data => {
    let id = null;
    data.forEach(item => {
      if (item.testActivityId) {
        id = item.testActivityId;
      }
    });
    return id;
  };

  onTabChange = (e, name) => {
    this.setState({
      selectedTab: name
    });
  };

  getQuestions = () => {
    const { classResponse } = this.props;
    if (classResponse) {
      const { testItems } = classResponse;
      if (testItems) {
        return testItems;
      }
    }
    return [];
  };

  render() {
    const { gradebook, testActivity, creating, match, classResponse, additionalData = { classes: [] }, t } = this.props;
    const { selectedTab, flag } = this.state;

    const { assignmentId, classId } = match.params;
    const testActivityId = this.getTestActivity(testActivity);
    const classname = additionalData ? additionalData.classes : [];
    const questions = this.getQuestions();
    const questionsIds = [];
    for (let i = 0; i < questions.length; i++) {
      questionsIds.push({ name: `Question ${i + 1}` });
    }
    return (
      <div>
        <HooksContainer classId={classId} assignmentId={assignmentId} />
        <ClassHeader
          classId={classId}
          active="classboard"
          creating={creating}
          onCreate={this.handleCreate}
          assignmentId={assignmentId}
          additionalData={additionalData}
          testActivityId={testActivityId}
        />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            &lt; <AnchorLink to="/author/assignments">RECENTS ASSIGNMENTS</AnchorLink> /{" "}
            <Anchor>{additionalData.testName}</Anchor> / <Anchor>{additionalData.className}</Anchor>
          </PaginationInfo>
          <div>
            <StudentButton
              type={selectedTab === "Student" ? "primary" : ""}
              onClick={e => this.onTabChange(e, "Student")}
            >
              STUDENT
            </StudentButton>
            <QuestionButton
              type={selectedTab === "questionView" ? "primary" : ""}
              onClick={e => this.onTabChange(e, "questionView")}
            >
              QUESTION
            </QuestionButton>
          </div>
          <ClassSelect classname={selectedTab === "Student" ? classname : questionsIds} />
        </StyledFlexContainer>
        {selectedTab === "Student" ? (
          <React.Fragment>
            <StyledCard bordered={false}>
              <Graph gradebook={gradebook} />
            </StyledCard>
            <StyledFlexContainer justifyContent="space-between">
              <CheckContainer>
                <StyledAnc onClick={this.changeStateTrue}>
                  <img src={Ghat} alt="" />
                </StyledAnc>
                <SpaceDiv />
                <StyledAnc onClick={this.changeStateFalse}>
                  <img src={Stats} alt="" />
                </StyledAnc>
                <SpaceDiv />
                <BarDiv />
                <SpaceDiv />
                <StyledCheckbox checked>SELECT ALL</StyledCheckbox>
              </CheckContainer>
              <ButtonGroup>
                <StyledButton>
                  <img src={Ptools} alt="" />
                  <ButtonSpace />
                  {t("common.print")}
                </StyledButton>
                <StyledButton>
                  <img src={Elinks} alt="" />
                  <ButtonSpace />
                  {t("common.redirect")}
                </StyledButton>
                <StyledButton>
                  <img src={More} alt="" />
                  <ButtonSpace />
                  {t("common.more")}
                </StyledButton>
              </ButtonGroup>
            </StyledFlexContainer>
            {flag ? (
              <DisneyCard testActivity={testActivity} assignmentId={assignmentId} classId={classId} />
            ) : (
              <Score gradebook={gradebook} assignmentId={assignmentId} classId={classId} />
            )}
          </React.Fragment>
        ) : (
          <QuestionContainer classResponse={classResponse} testActivity={testActivity} />
        )}
      </div>
    );
  }
}

const enhance = compose(
  withWindowSizes,
  withNamespaces("classBoard"),
  connect(
    state => ({
      gradebook: getGradeBookSelector(state),
      testActivity: getTestActivitySelector(state),
      classResponse: getClassResponseSelector(state),
      additionalData: getAdditionalDataSelector(state)
    }),
    {
      loadGradebook: receiveGradeBookdAction,
      loadTestActivity: receiveTestActivitydAction,
      loadClassResponses: receiveClassResponseAction
    }
  )
);

export default enhance(ClassBoard);

/* eslint-disable react/require-default-props */
ClassBoard.propTypes = {
  gradebook: PropTypes.object,
  classResponse: PropTypes.object,
  additionalData: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  loadTestActivity: PropTypes.func,
  creating: PropTypes.object,
  testActivity: PropTypes.array,
  t: PropTypes.func,
  loadGradebook: PropTypes.func,
  loadClassResponses: PropTypes.func
};
