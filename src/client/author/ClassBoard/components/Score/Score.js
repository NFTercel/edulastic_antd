/* eslint-disable no-mixed-operators */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { StyledCard, TableData, StyledParaF, StyledParaS, StyledProgress } from "./styled";

export default class Score extends Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      filteredInfo: null,
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: null
    };
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      filteredInfo: filters,
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      filteredInfo: null,
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
    });
  };

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const dataSource = [];
    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line react/destructuring-assignment
    this.props.gradebook.itemsSummary.map((data, i) => {
      let avg_per;
      if (data.maxScore) {
        if (data.avgScore) {
          // eslint-disable-next-line radix
          avg_per = (parseFloat(data.avgScore) / parseFloat(data.maxScore)) * 100;
        } else {
          avg_per = 0;
        }
      } else {
        // eslint-disable-next-line radix
        // eslint-disable-next-line no-lonely-if
        if (data.avgScore) {
          // eslint-disable-next-line radix
          avg_per = (parseFloat(data.avgScore) / 1) * 100;
        } else {
          avg_per = 0;
        }
      }

      dataSource.push({
        key: i,
        Question: i,
        Max: (data.maxScore && data.maxScore) || "-",
        Correct: data.correctNum,
        Partially: (data.partialNum && data.partialNum) || "-",
        Wrong: data.wrongNum,
        Average: (data.avgScore && data.avgScore) || "-",
        Average_per: parseInt(avg_per)
      });
    });

    // console.log(dataSource)

    const columns = [
      {
        title: "Question",
        dataIndex: "Question",
        key: "Question",
        width: "13.6%",
        render: a => <StyledParaF>Q{a + 1}</StyledParaF>,
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "Question" && sortedInfo.order
      },
      {
        title: "Max Possible Score",
        dataIndex: "Max",
        key: "Max",
        width: "13.6%",
        render: a => <StyledParaS>{a}</StyledParaS>,
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Correct",
        dataIndex: "Correct",
        key: "Correct",
        width: "13.6%",
        render: a => <StyledParaS>{a}</StyledParaS>,
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Partially Correct",
        dataIndex: "Partially",
        key: "Partially Correct",
        width: "13.6%",
        render: a => <StyledParaS>{a}</StyledParaS>,
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Wrong",
        dataIndex: "Wrong",
        key: "Wrong",
        width: "13.6%",
        render: a => <StyledParaS>{a}</StyledParaS>,
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Average Score",
        dataIndex: "Average",
        key: "Average Score",
        width: "17.6%",
        render: a => <StyledParaS>{a}</StyledParaS>,
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Average Score %",
        dataIndex: "Average_per",
        key: "Average_per",
        width: "21.6%",
        render: a => (
          <div>
            <StyledProgress percent={a} size="small" strokeWidth={15} strokeColor="#fdcc3a" showInfo={false} /> {a}%
          </div>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      }
    ];
    return (
      <StyledCard bordered={false}>
        <TableData columns={columns} dataSource={dataSource} pagination={false} />
      </StyledCard>
    );
  }
}
