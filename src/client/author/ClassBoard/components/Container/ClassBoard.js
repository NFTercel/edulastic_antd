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
import DisneyCardContainer from "../DisneyCardContainer/DisneyCardContainer";
import Graph from "../ProgressGraph/ProgressGraph";
import ClassSelect from "../../../Shared/Components/ClassSelect/ClassSelect";
import ClassHeader from "../../../Shared/Components/ClassHeader/ClassHeader";
import CollapseButton from "../../../Shared/Components/CollpaseButton/CollapseButton";

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
  StyledCardContainer,
  StyledCard,
  StyledButton,
  StyledCheckbox,
  PaginationInfo,
  ButtonGroup,
  StyledFlexContainer,
  StudentButtonDiv,
  StudentButton,
  QuestionButton
} from "./styled";

class ClassBoard extends Component {
  constructor(props) {
    super(props);
    this.changeStateTrue = this.changeStateTrue.bind(this);
    this.changeStateFalse = this.changeStateFalse.bind(this);
    this.onSelectAllChange = this.onSelectAllChange.bind(this);

    this.state = {
      flag: true,
      selectedTab: "Student",
      selectAll: false,
      selectedQuestion: 0,
      style: { height: "285px" }
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

  onSelectAllChange = e => {
    this.props.testActivity.map(student => {
      student.check = e.target.checked;
    });
    this.setState({
      selectAll: e.target.checked
    });
  };

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
    const { classResponse: { testItems = [] } = {} } = this.props;
    let totalQuestions = [];
    testItems.forEach(({ data: { questions = [] } = {} }) =>
      questions.forEach(q => {
        totalQuestions = [...totalQuestions, q];
      })
    );
    return totalQuestions;
  };

  changeCardCheck = (isCheck, studentId) => {
    let nCountTrue = 0;
    this.props.testActivity.map(student => {
      if (student.studentId === studentId) student.check = isCheck;
      if (student.check) nCountTrue++;
    });
    this.setState({
      selectAll: nCountTrue == this.props.testActivity.length ? true : false
    });
  };

  onClickCollapse = collapsed => {
    this.setState({
      style: collapsed ? { height: "285px" } : { height: "5px" }
    });
  };

  render() {
    const { gradebook, testActivity, creating, match, classResponse, additionalData = { classes: [] }, t } = this.props;
    const { selectedTab, flag, selectedQuestion, selectAll, style } = this.state;

    const { assignmentId, classId, assignmentName } = match.params;
    const testActivityId = this.getTestActivity(testActivity);
    const classname = additionalData ? additionalData.classes : [];
    const questions = this.getQuestions();
    const questionsIds = questions.map((q, i) => ({ name: `Question ${i + 1}` }));
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
          assignmentName={assignmentName}
        />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            &lt; <AnchorLink to="/author/assignments">RECENTS ASSIGNMENTS</AnchorLink> /{" "}
            <AnchorLink to="/author/assignments">{additionalData.testName}</AnchorLink> /{" "}
            <Anchor>{additionalData.className}</Anchor>
          </PaginationInfo>
          <StudentButtonDiv>
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
          </StudentButtonDiv>
          <ClassSelect
            classid="DI"
            classname={selectedTab === "Student" ? classname : questionsIds}
            selected={selectedQuestion}
            handleChange={value => {
              this.setState({ selectedQuestion: value });
            }}
          />
        </StyledFlexContainer>
        {selectedTab === "Student" ? (
          <React.Fragment>
            <StyledCardContainer>
              <StyledCard bordered={false} style={style}>
                <Graph gradebook={gradebook} />
              </StyledCard>
              <CollapseButton handleClickCollapse={this.onClickCollapse} collapsed={false} />
            </StyledCardContainer>

            <StyledFlexContainer justifyContent="space-between">
              <StyledCheckbox checked={this.state.selectAll} onChange={this.onSelectAllChange}>
                SELECT ALL
              </StyledCheckbox>
            </StyledFlexContainer>
            {flag ? (
              <DisneyCardContainer
                testActivity={testActivity}
                assignmentId={assignmentId}
                classId={classId}
                changeCardCheck={this.changeCardCheck}
              />
            ) : (
              <Score gradebook={gradebook} assignmentId={assignmentId} classId={classId} />
            )}
          </React.Fragment>
        ) : (
          <QuestionContainer
            classResponse={classResponse}
            testActivity={testActivity}
            question={questions[selectedQuestion]}
          />
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
