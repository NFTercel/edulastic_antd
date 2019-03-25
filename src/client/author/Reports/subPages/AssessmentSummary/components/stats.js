import React, { useMemo } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { StyledH3, Capitalized } from "../../../common/styled";
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

  const rolesMap = {
    teacher: "class",
    sa: "school",
    da: "district"
  };

  const parseData = data => {
    let avgScore = 0,
      total = 0,
      avgStudentScore = 0,
      studentsAssigned = 0,
      studentsGraded = 0,
      studentsAbsent = 0,
      sumTotalScore = 0,
      sumTotalMaxScore = 0,
      sumStudentCount = 0;

    for (let item of data) {
      let {
        studentsGraded: _studentsGraded,
        studentsAssigned: _studentsAssigned,
        studentsAbsent: _studentsAbsent,
        totalScore: _totalScore,
        totalMaxScore: _totalMaxScore,
        sampleCount: _sampleCount
      } = item;
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
      <StyledH3>
        <Capitalized>{rolesMap[props.role]}</Capitalized> Statistics of {props.name}
      </StyledH3>
      <StyledInnerRow type="flex" justify="start" className="average-stats">
        <Col>
          <p className="stats-title">Average Score</p>
          <div className="stats-value">
            <p>
              <span className="stats-value-big">{state.avgScore}</span>
              <span className="stats-value-small">/ {Math.round(state.total)}</span>
            </p>
          </div>
        </Col>
        <Col>
          <p className="stats-title">Average Student Score</p>
          <p className="stats-value">
            <span className="stats-value-big">{state.avgStudentScore}%</span>
          </p>
        </Col>
      </StyledInnerRow>
      <StyledInnerRow type="flex" justify="start" className="students-stats">
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
      </StyledInnerRow>
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  flex: 1;
  display: flex;
  flex-direction: column;

  .average-stats {
    flex-wrap: nowrap;
    min-height: 110px;

    > div {
      padding: 10px;
      flex: 1 1 50%;
      background-color: ${greyish};

      .stats-title {
        font-size: 17px;
        font-weight: 600;
      }
      .stats-value {
        display: flex;
        align-items: center;
        flex: 1;
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
    > div {
      flex: 1;
      padding: 10px;

      .students-title {
        flex-grow: 1;
        font-size: 17px;
        font-weight: 600;
      }
      .students-value {
        color: ${fadedBlack};
        font-size: 35px;
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

const StyledInnerRow = styled(Row)`
  flex: 1;
  color: ${greyishDarker1};

  > div {
    display: flex;
    flex-direction: column;
    margin: 5px;
  }
`;
