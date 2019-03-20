import React, { useState } from "react";
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

const AssignmentsTable = ({ assignments, handleSettingsChange, regradeType, regradeSettings }) => {
  const [list, setNewList] = useState(regradeSettings.assignmentList);
  const rowSelection = {
    selectedRowKeys: regradeType == "SPECIFIC" ? list : [],
    onChange: (selectedRowKeys, selectedRows) => {
      const assignmentList = selectedRows.map(item => item._id);
      handleSettingsChange("assignmentList", assignmentList);
      setNewList(assignmentList);
    },
    getCheckboxProps: () => ({
      disabled: regradeType !== "SPECIFIC"
    })
  };
  const tableData = assignments.map(item => ({
    key: item._id,
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
