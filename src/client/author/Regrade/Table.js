import React from "react";
import * as moment from "moment";

import { StyledTable } from "./styled";

const formatDate = date => moment(date).format("MM-DD-YYYY");

const tbleColumns = [
  {
    title: "Assigned By",
    dataIndex: "assigned"
  },
  {
    title: "Open Policy",
    dataIndex: "openPolicy"
  },
  {
    title: "Close Policy",
    dataIndex: "closePolicy"
  },
  {
    title: "Open Date",
    dataIndex: "openDate",
    render: formatDate
  },
  {
    title: "Close Date",
    dataIndex: "closeDate",
    render: formatDate
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  }
};

const AssignmentsTable = ({ assignments }) => {
  const tableData = assignments.map((item, i) => ({
    key: i,
    _id: item._id,
    class: item.class,
    students: item.students,
    specificStudents: item.specificStudents || false,
    openPolicy: item.openPolicy || "",
    closePolicy: item.closePolicy || "",
    openDate: item.startDate,
    closeDate: item.endDate,
    assigned: item.assignedBy.name
  }));
  return <StyledTable rowSelection={rowSelection} columns={tbleColumns} dataSource={tableData} />;
};

export default AssignmentsTable;
