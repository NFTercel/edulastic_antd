import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import CardCheckbox from "./CardCheckbox/CardCheckbox";

import {
  StyledCardContiner,
  StyledFlexDiv,
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
  StyledName,
  StyledParaSS,
  StyledParaSSS,
  SpaceDiv,
  RightAlignedCol
} from "./styled";

const roundFraction = n => Math.floor(n * 100) / 100;

export default class DisneyCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 4,
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

  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 4
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 4
      });
    }
  };

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
    const { testActivity, minValue, maxValue } = this.state;
    const styledCard = [];
    // const filteredTestActivity = testActivity.slice(minValue, maxValue);

    if (testActivity.length > 0) {
      testActivity.map((student, index) => {
        // TODO: use constants
        // eslint-disable-next-line no-unused-vars
        let status = "";
        if (student.status === "notStarted") {
          status = "NOT STARTED";
        } else if (student.status === "inProgress") {
          status = "IN PROGRESS";
        } else if (student.status === "submitted") {
          status = "SUBMITTED";
        } else if (student.status === "redirected") {
          status = "REDIRECTED";
        }

        let correctAnswers = 0;
        const questions = student.questionActivities.length;
        student.questionActivities.map(questionAct => {
          if (questionAct.correct) {
            correctAnswers++;
          }
          return null;
        });

        // eslint-disable-next-line radix
        const stu_per = roundFraction((parseFloat(correctAnswers) / parseFloat(questions)) * 100);

        const studentData = (
          <StyledCard bordered={false} key={index}>
            <PaginationInfoF>
              <CircularDiv>{this.getAvatarName(student.studentName)}</CircularDiv>
              <StyledName>
                <StyledParaF>{student.studentName ? student.studentName : "-"}</StyledParaF>
                {/* {student.present ? <StyledParaS>{status}</StyledParaS> : <StyledColorParaS>ABSENT</StyledColorParaS>} */}
              </StyledName>
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
                        className="fa fa-external-link"
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
                <StyledFlexDiv>
                  <StyledParaSS>
                    {correctAnswers} / {questions}
                  </StyledParaSS>
                  <StyledParaSSS>{stu_per || stu_per === 0 ? `${stu_per}%` : "-%"}</StyledParaSSS>
                </StyledFlexDiv>
                {student.testActivityId && (
                  <PagInfo>
                    <Link to={`/author/classresponses/${student.testActivityId}`}>
                      VIEW RESPONSES <GSpan>&gt;&gt;</GSpan>
                    </Link>
                  </PagInfo>
                )}
              </PerfomanceSection>
            </PaginationInfoS>
            <PaginationInfoT>
              {student.questionActivities.map(questionAct => {
                if (questionAct.correct) {
                  return <SquareColorDivGreen />;
                }
                if (questionAct.skipped) {
                  return <SquareColorDivGray />;
                }
                if (questionAct.partialCorrect) {
                  return <SquareColorDivYellow />;
                }
                if (questionAct.notStarted) {
                  return <SquareColorDisabled />;
                }
                if (!questionAct.correct) {
                  return <SquareColorDivPink />;
                }
                return null;
              })}
            </PaginationInfoT>
          </StyledCard>
        );
        styledCard.push(studentData);
        return null;
      });
    }

    return <StyledCardContiner>{styledCard}</StyledCardContiner>;
  }
}
