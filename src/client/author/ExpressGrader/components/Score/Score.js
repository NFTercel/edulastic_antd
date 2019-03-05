import React, { Fragment, Component } from "react";
import { Tag } from "antd";
import QuestionScore from "../QuestionScore/QuestionScore";
import { StyledCard, TableData, StyledDivMid, StyledTitle } from "./styled";

const titleTag = { background: "#caf5eb", margin: "1px 0", border: 0 };
class Score extends Component {
  constructor() {
    super();
    this.state = {
      columnData: [],
      columnInfo: [],
      testActivityId: null
    };
    this.getColumnsForTable = this.getColumnsForTable.bind(this);
  }

  componentDidMount() {
    const { testActivity } = this.props;
    const columnData = this.getDataForTable(testActivity);

    this.setState({ columnData });
  }

  componentWillReceiveProps(nextProps) {
    const { testActivity } = nextProps;
    const columnData = this.getDataForTable(testActivity);

    this.setState({ columnData });
  }

  getDataForTable = data => {
    let dataSource;
    let testActivity = null;

    if (data && data.length !== 0) {
      dataSource = data.map((student, index) => {
        const students = [];
        const rowIndex = index;
        const score =
          student.score && student.maxScore ? `${((student.score / student.maxScore) * 100).toFixed(2)}%` : "-";
        const studentInfo = {
          studentId: student.studentId,
          studentName: student.studentName
        };
        const testActivityId = student.testActivityId ? student.testActivityId : null;
        student.questionActivities.forEach((question, index) => {
          // console.log(question)
          const key = `Q${index}`;
          question.testActivityId = testActivityId;
          question.id = question._id;
          question.colIndex = index;
          question.rowIndex = rowIndex;
          question.key = key;
          students[key] = question;
        });

        students.students = studentInfo;
        students.score = { score: student.score, maxScore: student.maxScore };
        testActivity = testActivityId;

        return students;
      });
    } else {
      dataSource = [];
    }

    return dataSource;
  };

  getColumnsForTable = length => {
    const { showQuestionModal, viewType } = this.props;
    const columns = [
      {
        title: "Questions&Standarts",
        children: [
          {
            key: "students",
            title: "students",
            width: "12%",
            dataIndex: "students",
            render: record => <StyledDivMid>{record.studentName}</StyledDivMid>
          },
          {
            key: "score",
            title: "score",
            width: "15%",
            dataIndex: "score",
            render: record => {
              return (
                <StyledDivMid>
                  <span style={{ color: "#75B49B" }}>{record.score ? record.score : 0}%</span>(
                  <span style={{ color: "#75B49B" }}>{record.score}</span> / {record.maxScore})
                </StyledDivMid>
              );
            }
          }
        ]
      }
    ];

    for (let index = 1; index < length; index++) {
      let students = this.props.testActivity;
      let successAnswer = 0;
      students.forEach(student => {
        student && student.questionActivities[index].correct && successAnswer++;
      });
      const questionAvarageScore = `${Math.round((successAnswer / length) * 100)}%(${successAnswer}/${length})`;

      const key = `Q${index}`;
      let value = "";

      const column = {
        title: key,
        children: [
          {
            key,
            title: questionAvarageScore,
            dataIndex: key,
            render: record => {
              const tableData = this.state.columnData;
              const isTest = record && record.testActivityId;
              value = isTest ? (
                <div onClick={() => showQuestionModal(record, tableData)}>
                  <QuestionScore record={record} viewType={viewType} />
                </div>
              ) : (
                <div>-</div>
              );
              return <StyledDivMid>{value}</StyledDivMid>;
            }
          }
        ]
      };

      columns.push(column);
    }
    return columns;
  };

  render() {
    const { testActivity } = this.props;
    const { columnData } = this.state;
    let columnInfo = [];

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

export default Score;
