import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get } from "lodash";
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

import {
  gradebookSelectStudentAction,
  gradebookUnSelectStudentAction,
  gradebookUnSelectAllAction,
  gradebookSetSelectedAction
} from "../../../src/reducers/gradeBook";

// components
import Score from "../Score/Score";
import DisneyCardContainer from "../DisneyCardContainer/DisneyCardContainer";
import Graph from "../ProgressGraph/ProgressGraph";
import ClassSelect from "../../../Shared/Components/ClassSelect/ClassSelect";
import ClassHeader from "../../../Shared/Components/ClassHeader/ClassHeader";
import CollapseButton from "../../../Shared/Components/CollpaseButton/CollapseButton";

import HooksContainer from "../HooksContainer/HooksContainer";
import RedirectPopup from "../RedirectPopUp";
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

import { Button } from "antd";

/**
 * right side button group
 * @param {{redirect: Function }} param0
 */
const StudentActions = ({ redirect }) => (
  <Button.Group>
    <Button>Print</Button>
    <Button onClick={redirect}>redirect</Button>
    <Button>more</Button>
  </Button.Group>
);

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
      redirectPopup: false,
      isCollapsed: false
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
    const checked = e.target.checked;
    this.setState({
      selectAll: checked
    });
    if (checked) {
      this.props.studentSelect(this.props.allStudents.map(x => x._id));
    } else {
      this.props.studentUnselectAll();
    }
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
      selectAll: nCountTrue == this.props.testActivity.length > 0 ? true : false
    });
  };

  onClickCollapse = collapsed => {
    this.setState({
      isCollapsed: collapsed
    });
  };

  render() {
    const {
      gradebook,
      testActivity,
      creating,
      match,
      classResponse,
      additionalData = { classes: [] },
      t,
      selectedStudents,
      studentSelect,
      studentUnselect,
      setSelected,
      allStudents
    } = this.props;
    const { selectedTab, flag, selectedQuestion, selectAll, isCollapsed } = this.state;

    const { assignmentId, classId } = match.params;
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
              <StyledCard bordered={false} isCollapsed={isCollapsed}>
                <Graph gradebook={gradebook} />
              </StyledCard>
              <CollapseButton handleClickCollapse={this.onClickCollapse} collapsed={isCollapsed} />
            </StyledCardContainer>

            <StyledFlexContainer justifyContent="space-between">
              <StyledCheckbox checked={this.state.selectAll} onChange={this.onSelectAllChange}>
                {selectAll ? "UNSELECT ALL" : "SELECT ALL"}
              </StyledCheckbox>
              <StudentActions redirect={() => this.setState({ redirectPopup: true })} />
            </StyledFlexContainer>
            {flag ? (
              <DisneyCardContainer
                selectedStudents={selectedStudents}
                testActivity={testActivity}
                assignmentId={assignmentId}
                classId={classId}
                changeCardCheck={this.changeCardCheck}
                studentSelect={studentSelect}
                studentUnselect={studentUnselect}
              />
            ) : (
              <Score gradebook={gradebook} assignmentId={assignmentId} classId={classId} />
            )}

            <RedirectPopup
              open={this.state.redirectPopup}
              allStudents={allStudents}
              selectedStudents={selectedStudents}
              additionalData={additionalData}
              closePopup={() => {
                this.setState({ redirectPopup: false });
              }}
              setSelected={setSelected}
              assignmentId={assignmentId}
              groupId={classId}
            />
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
      additionalData: getAdditionalDataSelector(state),
      selectedStudents: get(state, ["author_classboard_gradebook", "selectedStudents"], {}),
      allStudents: get(state, ["author_classboard_testActivity", "data", "students"], [])
    }),
    {
      loadGradebook: receiveGradeBookdAction,
      loadTestActivity: receiveTestActivitydAction,
      loadClassResponses: receiveClassResponseAction,
      studentSelect: gradebookSelectStudentAction,
      studentUnselect: gradebookUnSelectStudentAction,
      studentUnselectAll: gradebookUnSelectAllAction,
      setSelected: gradebookSetSelectedAction
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
