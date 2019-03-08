import React, { Component } from "react";
import QuestionScore from "../QuestionScore/QuestionScore";
import { StyledCard, TableData, StyledDivMid, StyledTag, StyledText } from "./styled";

class ScoreTable extends Component {
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
          const key = `Q${index}`;
          question.key = key;
          students[key] = question;
          question.colIndex = index;
          question.id = question._id;
          question.rowIndex = rowIndex;
          question.testActivityId = testActivityId;
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
    const { showQuestionModal, questionActivities } = this.props;
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
            sorter: (a, b) => a["students"].studentName.length - b["students"].studentName.length,
            sortDirections: ["descend"]
          },
          {
            key: "score",
            title: "score",
            width: "15%",
            dataIndex: "score",
            render: record => (
              <StyledDivMid>
                <StyledText color="#75B49B">{record.score ? record.score : 0}%</StyledText>(
                <StyledText color="#75B49B">{record.score}</StyledText> / {record.maxScore})
              </StyledDivMid>
            ),
            onFilter: (value, record) => record.score.indexOf(value) === 0,
            sorter: (a, b) => a["score"] - b["score"],
            sortDirections: ["descend"]
          }
        ]
      }
    ];

    for (let index = 1; index < length; index++) {
      let successAnswer = 0;
      let students = this.props.testActivity;
      const key = `Q${index}`;
      const isQuestionActivities = questionActivities !== undefined && questionActivities.length !== 0;
      const title = (
        <StyledDivMid>
          Q{index}
          {isQuestionActivities && questionActivities[index].standards.map(tag => <StyledTag>{tag.level}</StyledTag>)}
        </StyledDivMid>
      );
      const questionAvarageScore = (
        <StyledDivMid>
          <StyledText color="#75B49B">{`${Math.round((successAnswer / length) * 100)}%`}</StyledText>(
          <StyledText color="#75B49B">{successAnswer}</StyledText>/ {length})
        </StyledDivMid>
      );

      students.forEach(student => {
        student && student.questionActivities[index].correct && successAnswer++;
      });

      const column = {
        title: title,
        children: [
          {
            key: key,
            dataIndex: key,
            title: questionAvarageScore,
            render: record => {
              const tableData = this.state.columnData;
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
