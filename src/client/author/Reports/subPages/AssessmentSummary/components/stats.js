import React, { useMemo } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { StyledH3 } from "../../../common/styled";
import { greyish, greyishDarker1, greenSomeWhatDark, fadedBlack } from "@edulastic/colors";

export const Stats = props => {
  const defaultState = {
    avgScore: 0,
    total: 0,
    avgStudentScore: 0,
    studentsAssigned: 0,
    studentsGraded: 0,
    studentsAbsent: 0
  };

  const parseData = data => {
    let avgScore = 0,
      total = 0,
      avgStudentScore = 0,
      studentsAssigned = 0,
      studentsGraded = 0,
      studentsAbsent = 0;

    let sumTotalScore = 0,
      sumTotalMaxScore = 0;

    let sumStudentCount = 0;

    for (let i = 0; i < data.length; i++) {
      let {
        studentsGraded: _studentsGraded,
        studentsAssigned: _studentsAssigned,
        studentsAbsent: _studentsAbsent,
        totalScore: _totalScore,
        totalMaxScore: _totalMaxScore,
        sampleCount: _sampleCount
      } = data[i];
      studentsGraded += _studentsGraded;
      studentsAssigned += _studentsAssigned;
      studentsAbsent += _studentsAbsent;
      sumTotalScore += _totalScore;
      sumTotalMaxScore += _totalMaxScore;
      sumStudentCount += _sampleCount;
    }

    avgStudentScore = ((sumTotalScore / sumTotalMaxScore) * 100 || 0).toFixed(0);
    avgScore = (sumTotalScore / sumStudentCount || 0).toFixed(2);
    total = (sumTotalMaxScore / sumStudentCount || 0).toFixed(2);

    return {
      avgScore: avgScore,
      total: total,
      avgStudentScore: avgStudentScore,
      studentsAssigned: studentsAssigned,
      studentsGraded: studentsGraded,
      studentsAbsent: studentsAbsent
    };
  };

  const state = useMemo(() => {
    return props.data ? parseData(props.data) : defaultState;
  }, [props.data]);

  return (
    <StyledRow>
      <StyledH3>District Statistics of {props.name}</StyledH3>
      <Row type="flex" justify="start" className="average-stats">
        <Col>
          <p className="stats-title">Average Score</p>
          <p className="stats-value">
            <span className="stats-value-big">{state.avgScore}</span>
            <span className="stats-value-small">/ {state.total}</span>
          </p>
        </Col>
        <Col>
          <p className="stats-title">Average Student Score</p>
          <p className="stats-value">
            <span className="stats-value-big">{state.avgStudentScore}%</span>
          </p>
        </Col>
      </Row>
      <Row type="flex" justify="start" className="students-stats">
        <Col>
          <p className="students-title">Students Assigned</p>
          <p className="students-value">{state.studentsAssigned}</p>
        </Col>
        <Col>
          <p className="students-title">Students Graded</p>
          <p className="students-value">{state.studentsGraded}</p>
        </Col>
        <Col>
          <p className="students-title">Students Absent</p>
          <p className="students-value">{state.studentsAbsent}</p>
        </Col>
      </Row>
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  .average-stats {
    color: ${greyishDarker1};
    flex-wrap: nowrap;

    > div {
      height: 110px;
      padding: 10px;
      flex: 1 1 50%;
      margin: 5px;
      background-color: ${greyish};

      .stats-title {
        font-size: 17px;
        font-weight: 600;
      }
      .stats-value {
        .stats-value-big {
          font-size: 35px;
          font-weight: 900;
          color: ${greenSomeWhatDark};
        }
        .stats-value-small {
          font-size: 25px;
        }
      }
    }
  }

  .students-stats {
    height: 100px;
    color: ${greyishDarker1};

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 5px;
      padding: 10px;

      .students-title {
        flex-grow: 1;
        font-size: 17px;
        font-weight: 600;
      }
      .students-value {
        color: ${fadedBlack};
        font-size: 25px;
        border-right: solid 1px ${greyishDarker1};
      }
    }
    >div: nth-child(3) {
      .students-value:last-child {
        border-right: none;
      }
    }
  }
`;
