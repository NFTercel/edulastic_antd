import React, { useState, useEffect, useRef, useMemo } from "react";
import { Row, Col } from "antd";
import { StyledTableData, StyledControlDropDown } from "../styled";
import { groupBy } from "lodash";
import Moment from "moment";

import { getStandatdDeviation, getVariance } from "../../../../common/util";

import columnData from "../../static/json/tableColumns.json";

export const AssessmentStatisticTable = props => {
  const [tableType, setTableType] = useState("school");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const updateTable = (type, data) => {
    let arr;
    let hMap;
    if (type === "school") {
      hMap = groupBy(data, "schoolId");
    } else if (type === "teacher") {
      hMap = groupBy(data, "teacherId");
    } else if (type === "class") {
      hMap = groupBy(data, "groupId");
    }

    arr = Object.keys(hMap).map((key, index) => {
      let data = hMap[key];
      let obj = { ...data[0] };

      let maxAssessmentDate = 0,
        sumTotalScore = 0,
        sumTotalMaxScore = 0,
        sumSampleCount = 0,
        sumStudentsAbsent = 0,
        sumStudentsAssigned = 0,
        sumStudentsGraded = 0,
        minScore = Infinity,
        maxScore = -Infinity,
        concatScores = [];

      for (let item of data) {
        let {
          totalScore,
          totalMaxScore,
          sampleCount,
          assessmentDate,
          studentsAbsent,
          studentsAssigned,
          studentsGraded,
          minScore: _minScore,
          maxScore: _maxScore,
          scores
        } = item;

        sumTotalScore += totalScore;
        sumTotalMaxScore += totalMaxScore;

        sumSampleCount += sampleCount;
        if (maxAssessmentDate < assessmentDate) maxAssessmentDate = assessmentDate;

        sumStudentsAbsent += studentsAbsent;
        sumStudentsAssigned += studentsAssigned;
        sumStudentsGraded += studentsGraded;
        minScore = Math.min(_minScore, minScore);
        maxScore = Math.max(_maxScore, maxScore);

        concatScores = concatScores.concat(scores);
      }
      let result = {
        ...obj,
        avgStudentScore: Number(((sumTotalScore / sumTotalMaxScore) * 100).toFixed(0)),
        scoreVariance: getVariance(concatScores),
        scoreStdDeviation: getStandatdDeviation(obj.scoreVariance),
        avgScore: (sumTotalScore / sumSampleCount).toFixed(2),
        assessmentDate: Moment(maxAssessmentDate).format("MMMM, DD YYYY"),
        studentsAbsent: sumStudentsAbsent,
        studentsAssigned: sumStudentsAssigned,
        studentsGraded: sumStudentsGraded,
        minScore,
        maxScore
      };

      return result;
    });
    return arr;
  };

  const sortAlphabets = key => (a, b) => {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };

  const sortNumbers = key => (a, b) => {
    let _a = a[key] || 0;
    let _b = b[key] || 0;
    return _a - _b;
  };

  const getColumns = tableType => {
    let columns = [...columnData[tableType].columns];
    columns[0].sorter = sortAlphabets("schoolId");
    if (tableType === "school") {
      columns[1].sorter = sortNumbers("avgStudentScore");
    } else {
      columns[2].sorter = sortNumbers("avgStudentScore");
    }
    return columns;
  };

  const table = useMemo(() => {
    if (props.data) {
      return {
        columns: getColumns(tableType),
        tableData: updateTable(tableType, props.data)
      };
    }
    return {
      columns: [],
      tableData: []
    };
  }, [props.data, tableType]);

  const updateTableCB = event => {
    setTableType(event.key);
  };

  return (
    <div className={`${props.className}`}>
      <Row type="flex" justify="start" className="top-area">
        <Col className="top-area-col table-title">
          Assessment Statistics of {props.name} by <span className="stats-grouped-by">{tableType}</span>
        </Col>
        <Col className="top-area-col control-area">
          <StyledControlDropDown groupby={tableType} updateTableCB={updateTableCB} />
        </Col>
      </Row>
      <StyledTableData columns={table.columns} dataSource={table.tableData} />
    </div>
  );
};
