import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardCheckbox from "./CardCheckbox/CardCheckbox";

import {
  StyledCardContiner,
  StyledDiv,
  StyledPagination,
  DisneyCard,
  MainDiv,
  MainDivLeft,
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
      minValue: 0,
      maxValue: 4,
      testActivity: this.props.testActivity,
      assignmentId: this.props.assignmentId,
      classId: this.props.classId
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      testActivity: this.props.testActivity,
      assignmentId: this.props.assignmentId,
      classId: this.props.classId
    });
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
    let styledCard = [];

    let testActivity = this.state.testActivity.slice(this.state.minValue, this.state.maxValue);

    if (testActivity.length > 0) {
      testActivity.map(student => {
        //TODO: use constants
        let status = "NOT STARTED";
        if (student.status === "notStarted") {
        } else if (student.status === "inProgress") {
          status = "IN PROGRESS";
        } else if (student.status === "submitted") {
          status = "SUBMITTED";
        }

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
              <CardCheckbox
                changeCardCheck={this.changeCardCheck}
                isCheck={student.check}
                studentId={student.studentId}
              />
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
              <Link to={`/author/classresponses/${student.testActivityId}`}>
                VIEW RESPONSES <GSpan>&gt;&gt;</GSpan>
              </Link>
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
            {testActivity && testActivity.length < 4 ? (
              <MainDivLeft>{styledCard}</MainDivLeft>
            ) : (
              <MainDiv>{styledCard}</MainDiv>
            )}
          </DisneyCard>
        )}

        <StyledPagination
          defaultCurrent={1}
          defaultPageSize={4}
          onChange={this.handleChange}
          total={this.state.testActivity && this.state.testActivity.length > 0 ? this.state.testActivity.length : 0}
        />
      </StyledCardContiner>
    );
  }
}
