import React from "react";
import { FlexContainer } from "@edulastic/common";
import { Table } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import InfoBlock from "./InfoBlock";

const columns = [
  {
    title: "Standard",
    dataIndex: "standard",
    key: "standard",
    render: data => <div>{data}</div>
  },
  {
    title: "Q's",
    dataIndex: "qs",
    key: "qs",
    render: data => <div>{data}</div>
  },
  {
    title: "Points",
    dataIndex: "points",
    key: "points",
    render: data => <div>{data}</div>
  }
];

const Summary = ({ total, tableData, questionsCount }) => (
  <div>
    <FlexContainer style={{ marginTop: 12, marginBottom: 25 }}>
      <InfoBlock count={questionsCount}>Questions</InfoBlock>
      <InfoBlock count={total}>Points</InfoBlock>
    </FlexContainer>
    <TableWrapper pagination={false} columns={columns} dataSource={tableData} />
  </div>
);

Summary.propTypes = {
  total: PropTypes.number.isRequired,
  tableData: PropTypes.array.isRequired,
  questionsCount: PropTypes.any.isRequired
};

export default Summary;

export const TableWrapper = styled(Table)`
  .ant-table-placeholder {
    z-index: 0;
  }
`;
