import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

import { TableWrapper } from "./styled";

import ClassSelector from "./ClassSelector";

const ClassList = ({ groups }) => {
  const columns = [
    {
      title: "Class Name",
      key: "name",
      dataIndex: "name"
    },
    { title: "Class Code", key: "code", dataIndex: "code" },
    { title: "Grades" },
    { title: "Subject" },
    { title: "Tags" },
    { title: "Students" },
    { title: "Assigments" }
  ];

  return (
    <TableWrapper>
      <ClassSelector />
      <Table columns={columns} dataSource={groups} />
    </TableWrapper>
  );
};

ClassList.propTypes = {
  groups: PropTypes.array.isRequired
};
export default ClassList;
