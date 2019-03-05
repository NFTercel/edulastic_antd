import React, { Component } from "react";
import styled from "styled-components";
import { Card, Table } from "antd";

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
    console.log("Various parameters", pagination, filters, sorter);
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
    for (let i = 0; i < 10; i++) {
      dataSource.push({
        key: i,
        Domain: "2-LS2",
        Standard: "2.LS2.1",
        Question: "Q1",
        Max: "1",
        Correct: "16",
        Average_per: "00%"
      });
    }
    const columns = [
      {
        title: "Question & Standards",
        dataIndex: "Standards",
        key: "Standards",
        width: "20%",
        render: () => (
          <StyledDivMid>
            <StyledDivPartOne>Disney 1</StyledDivPartOne>
            <StyledDivPartTwo>
              86% <StyledDivColor>(</StyledDivColor>12/
              <StyledDivColor>14)</StyledDivColor>
            </StyledDivPartTwo>
          </StyledDivMid>
        )
      },
      {
        title: "Q1",
        dataIndex: "Q1",
        key: "Q1",
        width: "13.3%",
        render: () => (
          <StyledDivFF>
            86% <StyledDivColor>(</StyledDivColor>12/
            <StyledDivColor>14)</StyledDivColor>
          </StyledDivFF>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "Domain" && sortedInfo.order
      },
      {
        title: "Q2",
        dataIndex: "Q2",
        key: "Q2",
        width: "13.3%",
        render: () => (
          <StyledDivFF>
            75% <StyledDivColor>(</StyledDivColor>10.5/
            <StyledDivColor>14)</StyledDivColor>
          </StyledDivFF>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "Domain" && sortedInfo.order
      },
      {
        title: "Q3",
        dataIndex: "Q3",
        key: "Q3",
        width: "13.3%",
        render: () => (
          <StyledDivFF>
            79% <StyledDivColor>(</StyledDivColor>11/
            <StyledDivColor>14)</StyledDivColor>
          </StyledDivFF>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "Domain" && sortedInfo.order
      },
      {
        title: "Q4",
        dataIndex: "Q4",
        key: "Q4",
        width: "13.3%",
        render: () => (
          <StyledDivFF>
            86% <StyledDivColor>(</StyledDivColor>12/
            <StyledDivColor>14)</StyledDivColor>
          </StyledDivFF>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "Domain" && sortedInfo.order
      },
      {
        title: "Q5",
        dataIndex: "Q5",
        key: "Q5",
        width: "13.3%",
        render: () => (
          <StyledDivFF>
            86% <StyledDivColor>(</StyledDivColor>12/
            <StyledDivColor>14)</StyledDivColor>
          </StyledDivFF>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "Domain" && sortedInfo.order
      },
      {
        title: "Q6",
        dataIndex: "Q6",
        key: "Q6",
        width: "13.3%",
        render: () => (
          <StyledDivFF>
            82% <StyledDivColor>(</StyledDivColor>11.43/
            <StyledDivColor>14)</StyledDivColor>
          </StyledDivFF>
        ),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "Domain" && sortedInfo.order
      }
    ];

    return (
      <StyledCard bordered={false}>
        <TableData columns={columns} dataSource={dataSource} pagination={false} />
      </StyledCard>
    );
  }
}

const StyledCard = styled(Card)`
  margin: 0px auto 60px auto;
  width: 95%;
  height: auto;
  background-color: transparent;
`;
const TableData = styled(Table)`
  text-align: center;
  background-color: white;
  border-radius: 16px;
  box-shadow: 3px 3px 3px lightgray;
  .ant-table-thead > tr > th {
    text-align: center;
    font-size: 0.9em;
    font-weight: bold;
    color: #565e6d;
    background-color: #f5f9fe;
  }
  .ant-table-thead > tr {
    border-radius: 16px;
  }
  .ant-table-tbody tr td {
    border: 1px solid #f8f5f5;
    margin: 0px;
    border-radius: 5px;
  }
`;
const StyledDivFF = styled.div`
  color: #57b495;
  width: 72%;
  padding: 3px 0px;
  text-align: center;
  font-size: 0.9em;
  font-weight: 800;
  margin: auto;
`;
const StyledDivColor = styled.span`
  color: #565e6d;
  width: 72%;
  padding: 3px 0px;
  text-align: center;
  font-size: 0.9em;
  font-weight: 800;
  margin: auto;
`;

const StyledDivMid = styled.div`
  width: 80%;
  margin: 0px auto;
  font-size: 0.9em;
  color: #565e6d;
`;
const StyledDivPartOne = styled.div`
  width:49.9%;
  display:inline-block
  font-weight:bold;
  border-right:0.1em solid #dcefe9;


`;
const StyledDivPartTwo = styled.div`
  width:49.9%;
  display:inline-block
  color:#57b495;
  padding:3px 0px;
  text-align:right;
  font-size:1em;
  font-weight:800;
  margin:auto;
`;
