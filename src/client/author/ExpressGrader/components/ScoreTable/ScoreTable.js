import React, { Component } from "react";
import QuestionScore from "../QuestionScore/QuestionScore";
import { StyledCard, TableData, StyledDivMid, StyledTag, StyledText } from "./styled";

function getDataForTable(data) {
  let dataSource;
  if (data && data.length !== 0) {
    dataSource = data.map((student, index) => {
      const students = [];
      const rowIndex = index;
      const studentInfo = {
        studentId: student.studentId,
        studentName: student.studentName
      };
      const testActivityId = student.testActivityId ? student.testActivityId : null;
      student.questionActivities.forEach((question, index) => {
        const key = `Q${index}`;
        question.key = key;
        students[key] = question;
        question.colIndex = index;
        question.id = question._id;
        question.rowIndex = rowIndex;
        question.studentId = student.studentId;
        question.testActivityId = testActivityId;
        question.score = isNaN(question.score) ? 0 : question.score;
      });

      students.students = studentInfo;
      students.score = { score: isNaN(student.score) ? 0 : student.score, maxScore: student.maxScore };
      return students;
    });
  } else {
    dataSource = [];
  }

  return dataSource;
}

class ScoreTable extends Component {
  constructor() {
    super();
    this.state = {
      columnData: []
    };
  }

  static getDerivedStateFromProps(props) {
    const { testActivity } = props;
    const columnData = getDataForTable(testActivity);
    return { columnData };
  }

  getColumnsForTable = length => {
    const { showQuestionModal } = this.props;
    const columns = [
      {
        title: "Questions&Standards",
        children: [
          {
            key: "students",
            title: "students",
            width: "12%",
            dataIndex: "students",
            render: record => <StyledDivMid>{record.studentName}</StyledDivMid>,
            sorter: (a, b) => (a.students.studentName.toUpperCase() > b.students.studentName.toUpperCase() ? 1 : -1),
            sortDirections: ["descend"]
          },
          {
            key: "score",
            title: "score",
            width: "15%",
            dataIndex: "score",
            render: record => {
              const { score = 0, maxScore = 0 } = record;
              const percent = maxScore === 0 ? "-" : `${((100 * score) / maxScore).toFixed(0)}%`;
              return (
                <StyledDivMid>
                  <StyledText color="#75B49B">{percent}</StyledText>(<StyledText color="#75B49B">{score}</StyledText> /{" "}
                  {maxScore})
                </StyledDivMid>
              );
            },
            onFilter: (value, record) => record.score.indexOf(value) === 0,
            sorter: (a, b) => (a.score.score > b.score.score ? 1 : -1),
            sortDirections: ["descend"]
          }
        ]
      }
    ];

    for (let index = 0; index < length; index++) {
      let successAnswer = 0;
      const { testActivity: students } = this.props;
      const key = `Q${index}`;
      // const isQuestionActivities = questionActivities !== undefined && questionActivities.length !== 0;
      const title = (
        <StyledDivMid>
          Q{index + 1}
          {/* {isQuestionActivities && questionActivities[index].standards.map(tag => <StyledTag>{tag.level}</StyledTag>)} */}
        </StyledDivMid>
      );
      students.forEach(student => {
        if (student && student.questionActivities[index].correct) successAnswer++;
      });
      const questionAvarageScore = (
        <StyledDivMid>
          <StyledText color="#75B49B">{`${Math.round((successAnswer / length) * 100)}%`}</StyledText>(
          <StyledText color="#75B49B">{successAnswer}</StyledText>/ {length})
        </StyledDivMid>
      );

      const column = {
        title,
        children: [
          {
            key,
            dataIndex: key,
            title: questionAvarageScore,
            render: record => {
              const { columnData: tableData } = this.state;
              const isTest = record && record.testActivityId;
              const cell = isTest ? (
                <QuestionScore question={record} tableData={tableData} showQuestionModal={showQuestionModal} />
              ) : (
                <StyledDivMid>-</StyledDivMid>
              );
              return cell;
            }
          }
        ],
        sorter: (a, b) => a[key].score - b[key].score,
        sortDirections: ["descend"]
      };

      columns.push(column);
    }
    return columns;
  };

  render() {
    let columnInfo = [];
    const { columnData } = this.state;
    const { testActivity } = this.props;
    const columnsLength = testActivity && testActivity.length !== 0 ? testActivity[0].questionActivities.length : 0;
    if (columnsLength) {
      columnInfo = this.getColumnsForTable(columnsLength);
    }

    return (
      <StyledCard bordered={false}>
        <TableData pagination={false} columns={columnInfo} dataSource={columnData} />
      </StyledCard>
    );
  }
}

export default ScoreTable;
