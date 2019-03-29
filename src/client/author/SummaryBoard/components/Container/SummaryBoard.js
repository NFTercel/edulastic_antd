import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { IconCircleCheck, IconArrowCircleUp } from "@edulastic/icons";
// ducks
import {
  getTestActivitySelector,
  getGradeBookSelector,
  getAdditionalDataSelector,
  getClassResponseSelector,
  getTestQuestionActivitiesSelector
} from "../../../ClassBoard/ducks";

// actions
import { receiveTestActivitydAction } from "../../../src/actions/classBoard";
// components
import ClassHeader from "../../../Shared/Components/ClassHeader/ClassHeader";
import HooksContainer from "../HooksContainer/HooksContainer";
// icon images
import NightIcon from "../../assets/night.svg";
import MistakesMarkIcon from "../../assets/mistakes-mark.svg";
import ArrowDownIcon from "../../assets/arrow-down.svg";
import GraduateStudentIcon from "../../assets/graduate-student-avatar.svg";
// styled wrappers
import {
  Anchor,
  AnchorLink,
  StyledCard,
  PaginationInfo,
  StyledFlexContainer,
  SummaryInfoWrapper,
  InfoRow,
  SubInfoRow,
  InfoLabel,
  InfoValue,
  ValueTitle,
  LowestPerformersWrapper,
  StyledSummaryCard,
  ActionContainer,
  ActionDescriptionWrapper,
  ActionTitle,
  ActionDescription,
  ViewRecommendationsBtn,
  ListContainer,
  ListItem,
  ListItemTitle,
  ListItemValue,
  MistakesListItem,
  MistakesTitle,
  MistakesValue
} from "./styled";

class SummaryBoard extends Component {
  componentDidMount() {
    const { loadTestActivity, match } = this.props;
    const { assignmentId, classId } = match.params;
    loadTestActivity(assignmentId, classId);
  }

  getTestActivity = data => {
    let id = null;
    data.forEach(item => {
      if (item.testActivityId) {
        id = item.testActivityId;
      }
    });
    return id;
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

  getAverageScore = () => {
    const { gradebook } = this.props;
    const avgScore = gradebook && gradebook.avgScore;
    return Math.round(avgScore * 100) / 100;
  };

  getAverageTimeSpent = () => {
    const {
      gradebook: { itemsSummary }
    } = this.props;
    const avgTimeSpent = itemsSummary.reduce((t, item) => t + item.avgTimeSpent, 0);
    return avgTimeSpent;
  };

  getMostCommonMistakes = () => {
    const { testQuestionActivities } = this.props;

    const uniqueTestQuestionActivities = [
      ...new Set(testQuestionActivities.map(testQuestionActivity => testQuestionActivity.qid))
    ];

    const hasWrongAnswersItems = uniqueTestQuestionActivities.map(qid => {
      const testActivities = testQuestionActivities.filter(
        testQuestionActivity => testQuestionActivity.qid === qid && !testQuestionActivity.skipped
      );

      const wrongAnswers = testActivities.filter(testQuestionActivity => !testQuestionActivity.correct);

      return {
        qid,
        wrong: wrongAnswers.length,
        attempted: testActivities.length
      };
    });

    hasWrongAnswersItems.sort((a, b) => b.wrong - a.wrong);
    return hasWrongAnswersItems.slice(0, 2);
  };

  getLowestPerformers = () => {
    const { testActivity: studentItems } = this.props;
    const submittedStudents = studentItems.filter(student => student.status === "submitted");
    submittedStudents.sort((a, b) => a.score - b.score);
    return submittedStudents.slice(0, 5);
  };

  render() {
    const { testActivity, creating, match, additionalData = { classes: [] }, gradebook } = this.props;
    const { assignmentId, classId } = match.params;
    const testActivityId = this.getTestActivity(testActivity);
    const commonMistakes = this.getMostCommonMistakes();
    const lowestPerformers = this.getLowestPerformers();

    return (
      <div>
        <HooksContainer classId={classId} assignmentId={assignmentId} />

        <ClassHeader
          classId={classId}
          active="summary"
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
        </StyledFlexContainer>

        <StyledFlexContainer>
          <SummaryInfoWrapper>
            <InfoRow>
              <StyledSummaryCard>
                <SubInfoRow>
                  <InfoLabel>Completed</InfoLabel>
                  <IconCircleCheck />
                </SubInfoRow>
                <SubInfoRow>
                  <ValueTitle>Students</ValueTitle>
                  <InfoValue>{`${gradebook.submittedNumber}/${gradebook.total}`}</InfoValue>
                </SubInfoRow>
              </StyledSummaryCard>
              <StyledSummaryCard>
                <SubInfoRow>
                  <InfoLabel>Average score</InfoLabel>
                  <IconArrowCircleUp />
                </SubInfoRow>
                <SubInfoRow>
                  <ValueTitle>Percent</ValueTitle>
                  <InfoValue>{this.getAverageScore()}</InfoValue>
                </SubInfoRow>
              </StyledSummaryCard>
            </InfoRow>
            <InfoRow>
              <StyledSummaryCard>
                <SubInfoRow>
                  <InfoLabel>Time Spent (Hr:Min)</InfoLabel>
                  <img src={NightIcon} alt="Time Spent" />
                </SubInfoRow>
                <SubInfoRow>
                  <ValueTitle>Average</ValueTitle>
                  <InfoValue>{this.getAverageTimeSpent()}</InfoValue>
                </SubInfoRow>
              </StyledSummaryCard>
              <StyledSummaryCard>
                <SubInfoRow>
                  <InfoLabel>Most Common Mistakes</InfoLabel>
                  <img src={MistakesMarkIcon} alt="Mistakes" />
                </SubInfoRow>
                <ListContainer>
                  {commonMistakes.map((cm, index) => (
                    <MistakesListItem key={index}>
                      <MistakesTitle>{`Q${index + 1} (N-RN.${index + 1})`}</MistakesTitle>
                      <MistakesValue>
                        {cm.wrong}
                        <img src={GraduateStudentIcon} alt="Student" />
                      </MistakesValue>
                    </MistakesListItem>
                  ))}
                </ListContainer>
              </StyledSummaryCard>
            </InfoRow>
          </SummaryInfoWrapper>
          <LowestPerformersWrapper>
            <StyledCard>
              <SubInfoRow>
                <InfoLabel>Lowest Performers</InfoLabel>
                <img src={ArrowDownIcon} alt="Lowest Performers" />
              </SubInfoRow>
              <ListContainer>
                {lowestPerformers.map((lp, index) => (
                  <ListItem key={index}>
                    <ListItemTitle>{lp.studentName}</ListItemTitle>
                    <ListItemValue>{lp.maxScore}%</ListItemValue>
                  </ListItem>
                ))}
              </ListContainer>
            </StyledCard>
          </LowestPerformersWrapper>
        </StyledFlexContainer>

        <StyledFlexContainer>
          <StyledCard>
            <ActionContainer>
              <ActionDescriptionWrapper>
                <ActionTitle>Differentiation</ActionTitle>
                <ActionDescription>
                  {"Recommendations for each student"}
                  {"are based on their performance on this assessment."}
                </ActionDescription>
              </ActionDescriptionWrapper>
              <ViewRecommendationsBtn>VIEW RECOMMENDATIONS</ViewRecommendationsBtn>
            </ActionContainer>
          </StyledCard>
        </StyledFlexContainer>
      </div>
    );
  }
}

const enhance = compose(
  withWindowSizes,
  withNamespaces("summary"),
  connect(
    state => ({
      gradebook: getGradeBookSelector(state),
      testActivity: getTestActivitySelector(state),
      classResponse: getClassResponseSelector(state),
      additionalData: getAdditionalDataSelector(state),
      testQuestionActivities: getTestQuestionActivitiesSelector(state)
    }),
    {
      loadTestActivity: receiveTestActivitydAction
    }
  )
);

export default enhance(SummaryBoard);

/* eslint-disable react/require-default-props */
SummaryBoard.propTypes = {
  classResponse: PropTypes.object,
  additionalData: PropTypes.object,
  gradebook: PropTypes.object,
  match: PropTypes.object,
  loadTestActivity: PropTypes.func,
  creating: PropTypes.object,
  testActivity: PropTypes.array,
  testQuestionActivities: PropTypes.array
  // loadGradebook: PropTypes.func,
  // loadClassResponses: PropTypes.func
};
