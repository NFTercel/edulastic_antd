import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardCheckbox from "./CardCheckbox/CardCheckbox";
import { Col, Row } from "antd";
import styled from "styled-components";

import {
  StyledCardContiner,
  StyledDiv,
  DisneyCard,
  MainDiv,
  PerfomanceSection,
  StyledCard,
  Space,
  PagInfo,
  GSpan,
  PaginationInfoF,
  PaginationInfoS,
  PaginationInfoT,
  CircularDiv,
  SquareColorDivGreen,
  SquareColorDivGray,
  SquareColorDisabled,
  SquareColorDivPink,
  SquareColorDivYellow,
  StyledParaF,
  StyledParaFF,
  ColorSpan,
  StyledName,
  StyledParaS,
  StyledParaSS,
  StyledParaSSS,
  SpaceDiv,
  StyledDivLine
} from "./styled";

const roundFraction = n => Math.floor(n * 100) / 100;

export default class DisneyCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testActivity: this.props.testActivity,
      assignmentId: this.props.assignmentId,
      classId: this.props.classId
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      testActivity: props.testActivity,
      assignmentId: props.assignmentId,
      classId: props.classId
    };
  }

  changeCardCheck = (isCheck, studentId) => {
    this.props.changeCardCheck(isCheck, studentId);
  };

  getAvatarName = studentName => {
    let firstLetter = "";
    let secondLetter = "";

    if (studentName.length > 0) {
      if (studentName.indexOf(" ") >= 0) {
        firstLetter = studentName.substring(0, 1);
        econdLetter = studentName.substring(studentName.indexOf(" "), 1);
      } else if (this.countUpperCaseChars(studentName) >= 2) {
        firstLetter = studentName.match(/^[A-Z]{4}/);
        secondLetter = studentName.substring(
          studentName.indexOf(firstLetter),
          studentName.length - studentName.indexOf(firstLetter)
        );
        secondLetter = secondLetter.match(/^[A-Z]{4}/);
      } else if (studentName.length >= 2) {
        return studentName.substring(0, 2).toUpperCase();
      }

      return (firstLetter + secondLetter).toUpperCase();
    }
  };

  countUpperCaseChars = str => {
    var count = 0,
      len = str.length;
    for (var i = 0; i < len; i++) {
      if (/[A-Z]/.test(str.charAt(i))) count++;
    }
    return count;
  };

  render() {
    let styledCard = [];

    let { testActivity } = this.state;

    if (testActivity.length > 0) {
      //TODO: need to rewrite this when we have time
      testActivity.map(student => {
        //TODO: use constants
        let status = "NOT STARTED";
        let isDisabled = false;

        if (student.status === "notStarted") {
          isDisabled = true;
        } else if (student.status === "inProgress") {
          status = "IN PROGRESS";
        } else if (student.status === "submitted") {
          status = "SUBMITTED";
        } else if (student.status === "redirected") {
          status = "REDIRECTED";
        }

        if (!student.present) isDisabled = true;

        let correctAnswers = 0;
        const questions = student.questionActivities.length;
        student.questionActivities.map(questionAct => {
          if (questionAct.correct) {
            correctAnswers++;
          }
        });

        // eslint-disable-next-line radix
        const stu_per = roundFraction((parseFloat(correctAnswers) / parseFloat(questions)) * 100);

        const studentData = (
          <StyledCard bordered={false}>
            <PaginationInfoF>
              <CircularDiv>{this.getAvatarName(student.studentName)}</CircularDiv>
              <Space />
              <SpaceDiv />
              <StyledName>
                <StyledParaF>{student.studentName ? student.studentName : "-"}</StyledParaF>
                {student.present ? <StyledParaS>{status}</StyledParaS> : <StyledColorParaS>ABSENT</StyledColorParaS>}
              </StyledName>
              <SpaceDiv />
              <RightAlignedCol>
                <Row>
                  <Col>
                    <CardCheckbox
                      checked={this.props.selectedStudents[student.studentId]}
                      onChange={e => {
                        if (e.target.checked) {
                          this.props.studentSelect(student.studentId);
                        } else {
                          this.props.studentUnselect(student.studentId);
                        }
                      }}
                      studentId={student.studentId}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {student.redirected && (
                      <i
                        title="Assessment is redirected to the student. The most recent response will be shown"
                        class="fa fa-external-link"
                        aria-hidden="true"
                      />
                    )}
                  </Col>
                </Row>
              </RightAlignedCol>
            </PaginationInfoF>
            <PaginationInfoS>
              <StyledParaFF>Performance</StyledParaFF>
              <PerfomanceSection>
                <StyledParaSS>
                  <ColorSpan>{correctAnswers}</ColorSpan> / {questions}
                </StyledParaSS>
                <StyledParaSSS>{stu_per || stu_per == 0 ? stu_per + "%" : "-%"}</StyledParaSSS>
              </PerfomanceSection>
            </PaginationInfoS>
            <PaginationInfoT>
              <StyledDiv>
                <StyledParaFF>Question Responses</StyledParaFF>
                {student.questionActivities.map(questionAct => {
                  if (questionAct.correct) {
                    return <SquareColorDivGreen />;
                  } else if (questionAct.skipped) {
                    return <SquareColorDivGray />;
                  } else if (questionAct.partialCorrect) {
                    return <SquareColorDivYellow />;
                  } else if (questionAct.notStarted) {
                    return <SquareColorDisabled />;
                  } else if (!questionAct.correct) {
                    return <SquareColorDivPink />;
                  }
                })}
              </StyledDiv>
            </PaginationInfoT>
            <StyledDivLine />
            <PagInfo>
              {isDisabled ? (
                <Link to={`/author/classresponses/${student.testActivityId}`} disabled>
                  VIEW RESPONSES <GSpan>&gt;&gt;</GSpan>
                </Link>
              ) : (
                <Link to={`/author/classresponses/${student.testActivityId}`}>
                  VIEW RESPONSES <GSpan>&gt;&gt;</GSpan>
                </Link>
              )}
            </PagInfo>
          </StyledCard>
        );
        styledCard.push(studentData);
      });
    }

    return (
      <StyledCardContiner>
        {testActivity && testActivity.length > 0 && (
          <DisneyCard>
            <MainDiv>{styledCard}</MainDiv>
          </DisneyCard>
        )}
      </StyledCardContiner>
    );
  }
}

const RightAlignedCol = styled(Col)`
  align-self: flex-end;
  flex: 1 1 auto;
`;
