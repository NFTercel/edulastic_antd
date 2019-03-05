import React from "react";
import { IconTrash, IconPencilEdit } from "@edulastic/icons";
import { FlexContainer } from "@edulastic/common";
import { greenDark, green } from "@edulastic/colors";
import * as moment from "moment";
import ClassCell from "./ClassCell";
import { generate } from "mqtt-packet";

const formatDate = date => moment(date).format("MM-DD-YYYY");
const generateAssignmentColumns = group => [
  {
    title: "Class Name",
    dataIndex: "class",
    sorter: (a, b) => a.class._id.localeCompare(b.class._id),
    render: data => <ClassCell data={data} group={group} />
  },
  {
    title: "Open Policy",
    dataIndex: "openPolicy",
    sorter: (a, b) => a.openPolicy.localeCompare(b.openPolicy)
  },
  {
    title: "Close Policy",
    dataIndex: "closePolicy",
    sorter: (a, b) => a.closePolicy.localeCompare(b.closePolicy)
  },
  {
    title: "Open Date",
    dataIndex: "openDate",
    sorter: (a, b) => moment(a.openDate).unix() - moment(b.openDate).unix(),
    render: formatDate
  },
  {
    title: "Close Date",
    dataIndex: "closeDate",
    sorter: (a, b) => moment(a.closeDate).unix() - moment(b.closeDate).unix(),
    render: formatDate
  },
  {
    title: "",
    dataIndex: "buttons",
    sorter: false,
    // eslint-disable-next-line react/prop-types
    render: ({ remove, edit }, record) => {
      const handleClick = () =>
        edit({
          key: record.key,
          startDate: moment(record.openDate),
          endDate: moment(record.closeDate),
          openPolicy: record.openPolicy,
          closePolicy: record.closePolicy,
          class: record.class || [],
          students: record.students || [],
          specificStudents: record.specificStudents || false
        });
      return (
        <FlexContainer justifyContent="space-around">
          <IconPencilEdit
            data-cy="edit"
            onClick={handleClick}
            color={greenDark}
            hoverColor={green}
            style={{ cursor: "pointer" }}
          />
          <IconTrash
            onClick={() => remove(record)}
            color={greenDark}
            hoverColor={green}
            style={{ cursor: "pointer" }}
          />
        </FlexContainer>
      );
    }
  }
];

export default generateAssignmentColumns;
