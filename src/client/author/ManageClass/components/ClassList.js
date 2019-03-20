import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Table } from "antd";

const ClassList = ({ groups }) => {
  const columns = [
    {
      title: "Class Name",
      key: "name",
      dataIndex: "name"
    },
    { title: "classCode", key: "code", dataIndex: "code" },
    { title: "grades" },
    { title: "subject" },
    { title: "tags" },
    { title: "students" },
    { title: "assigments" }
  ];

  return (
    <TableWrapper>
      <Table columns={columns} dataSource={groups} />
    </TableWrapper>
  );
};

ClassList.propTypes = {
  groups: PropTypes.array.isRequired
};

const TableWrapper = styled.div`
  margin: 10px;
`;

export default ClassList;
