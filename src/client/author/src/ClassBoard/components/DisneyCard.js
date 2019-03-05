/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Card } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { themes } from "../../../../student/themes";

const classBoardTheme = themes.default.classboard;

const roundFraction = n => Math.floor(n * 100) / 100;

export default class DisneyCard extends Component {
  render() {
    let { testActivity, assignmentId, classId } = this.props;
    let styledCard = [];
    if (testActivity.length > 0) {
      console.log("TestActivity", this.props.testActivity);
      testActivity.map(student => {
        // eslint-disable-next-line radix
        const stu_per = roundFraction((parseFloat(student.score) / parseFloat(student.maxScore)) * 100);
        //TODO: use constants
        let status = "NOT STARTED";
        if (student.status === "notStarted") {
        } else if (student.status === "inProgress") {
          status = "IN PROGRESS";
        } else if (student.status === "submitted") {
          status = "SUBMITTED";
        }
        const studentData = (
          <StyledCard bordered={false}>
            <PaginationInfoF>
              <div>
                <CircularDiv>DI</CircularDiv>
                <Space />
                <SpaceDiv />
                <StyledDiv>
                  <StyledParaF>{student.studentName ? student.studentName : "-"}</StyledParaF>
                  {student.present ? <StyledParaS>{status}</StyledParaS> : <StyledColorParaS>ABSENT</StyledColorParaS>}
                </StyledDiv>
              </div>
              <SquareDiv />
            </PaginationInfoF>
            <PaginationInfoS>
              <StyledDiv>
                <StyledParaFF>Performance</StyledParaFF>
              </StyledDiv>
              <PerfomanceSection>
                <StyledParaSS>
                  <ColorSpan>{student.score || student.score == 0 ? student.score : "-"}</ColorSpan> /{" "}
                  {student.maxScore ? student.maxScore : "-"}
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
              <GSpan>&gt;&gt;</GSpan>
              <Link to={`/author/classresponses/${student.testActivityId}`}>
                VIEW RESPONSES <GSpan>&gt;&gt;</GSpan>
              </Link>
            </PagInfo>
          </StyledCard>
        );
        styledCard.push(studentData);
      });
    }

    return <MainDiv>{styledCard}</MainDiv>;
  }
}

const MainDiv = styled.div`
  margin-left: 10px;
`;
const PerfomanceSection = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 185px;
`;
const StyledCard = styled(Card)`
  margin: auto;
  width: 22%;
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
  display: inline-block;
  margin: 0px 0px 32px 32px;
`;
const Space = styled.div`
  display: inline-block;
  height: 30px;
`;
const PagInfo = styled.span`
  font-weight: bold;
  font-size: 10px;
  display: block;
  color: ${classBoardTheme.CardPageColor};
  text-align: center;
  padding-top: 20px;
`;
const GSpan = styled.span`
  font-size: 10px;
`;
const PaginationInfoF = styled.span`
  display: inline-block;
  margin-left: -5px;
  width: 105%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const PaginationInfoS = styled.span`
  display: inline-block;
  margin-left: -5px;
  margin-top: 25px;
  width: 100%;
`;
const PaginationInfoT = styled.span`
  display: inline-block;
  margin-left: -5px;
  margin-top: 25px;
  width: 100%;
`;

const CircularDiv = styled.div`
  width: 47px;
  height: 47px;
  border: 2px solid #5cb497;
  display: inline-block;
  border-radius: 128px;
  text-align: center;
  padding-top: 14px;
  color: ${classBoardTheme.CardCircularColor};
  padding-bottom: 28px;
  font-weight: bold;
`;
const StyledDiv = styled.div`
  display: inline-block;
`;

const SquareDiv = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid lightgray;
`;
const SquareColorDivGreen = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardSqurebgColor};
  margin: 10px 8px 0px 0px;
`;
const SquareColorDivGray = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardColor};
  margin: 10px 8px 0px 0px;
`;

const SquareColorDisabled = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardColor};
  opacity: 0.6;
  margin: 10px 8px 0px 0px;
`;

const SquareColorDivPink = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardSqare};
  margin: 10px 8px 0px 0px;
`;
const SquareColorDivYellow = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardSquareDivColor};
  margin: 10px 8px 0px 0px;
`;
const StyledParaF = styled.p`
  font-size: 1.1em;
  font-weight: bold;
`;

const StyledParaS = styled.p`
  font-size: 0.6em;
  font-weight: bold;
  color: ${classBoardTheme.CardCircularColor};
`;
const StyledColorParaS = styled.p`
  font-size: 0.6em;
  font-weight: bold;
  color: ${classBoardTheme.CardDisneyColor};
`;
const StyledParaFF = styled.p`
  font-size: 0.9em;
  font-weight: bold;
`;
const ColorSpan = styled.span`
  color: ${classBoardTheme.CardCircularColor};
`;

const StyledParaSS = styled.p`
  font-size: 1.12em;
  font-weight: bold;
  margin-top: 5px;
`;
const StyledParaSSS = styled.p`
  font-size: 1.12em;
  font-weight: bold;
  margin-top: 5px;
  color: ${classBoardTheme.CardCircularColor};
  display: inline-block;
`;
const SpaceDiv = styled.div`
    display:inline-block
    width:20px;
`;

const StyledDivLine = styled.div`
  width: 101%;
  height: 0.03em;
  border: 1px solid #f4f3f3;
  margin-top: 20px;
`;
