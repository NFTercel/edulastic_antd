import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { withNamespaces } from "@edulastic/localization";
import { FlexContainer } from "@edulastic/common";

import arrowUpIcon from "../../assets/arrow-up.svg";
import assignedIcon from "../../assets/assigned.svg";
import presentationIcon from "../../assets/presentation.svg";
import additemsIcon from "../../assets/add-items.svg";
import piechartIcon from "../../assets/pie-chart.svg";
import ActionMenu from "../ActionMenu/ActionMenu";

import {
  Container,
  Icon,
  TableData,
  BtnGreen,
  AssignmentTD,
  IconArrowDown,
  BtnAction,
  AssignedImg,
  ExpandDivdier,
  BtnSubmitted,
  BtnStarted,
  ActionDiv,
  GreyFont,
  ExpandedTable
} from "./styled";

const convertTableData = data => ({
  name: data[0].testName,
  key: data[0]._id,
  class: data[0].className,
  type: data[0].type,
  assigned: "Lorem Ipsum",
  status: "",
  submitted: `${data[0].submittedNumber} of ${data.length}`,
  graded: "1",
  action: "",
  classId: data[0].classId
});
const convertExpandTableData = (data, totalNumber) => ({
  name: "",
  key: data._id,
  class: data.className,
  type: data.type,
  assigned: "Lorem Ipsum",
  status: data.status,
  submitted: `${data.submittedNumber} of ${totalNumber}`,
  graded: "1",
  action: "",
  classId: data.classId
});

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: false
    };
  }

  static propTypes = {
    t: PropTypes.func.isRequired
  };

  onShowDetails = () => {
    this.setState({ details: true });
  };

  expandedRowRender = parentData => {
    const { t } = this.props;
    let getInfo;
    const columns = [
      {
        dataIndex: "name",
        width: "23%",
        render: text => <div>{text}</div>
      },
      {
        dataIndex: "class",
        width: "11%",
        render: text => (
          <div>
            <GreyFont>{text}</GreyFont>
          </div>
        )
      },
      {
        dataIndex: "type",
        width: "11%",
        render: () => (
          <div>
            <AssignedImg src={assignedIcon} />
          </div>
        )
      },
      {
        dataIndex: "assigned",
        width: "15%",
        render: text => (
          <div style={{ paddingLeft: "20px" }}>
            <GreyFont>{text}</GreyFont>
          </div>
        )
      },
      {
        dataIndex: "status",
        width: "12%",
        render: text => (
          <div>
            {text === "IN PROGRESS" ? (
              <BtnProgress size="small">{text}</BtnProgress>
            ) : text === t("common.submittedTag") ? (
              <BtnSubmitted size="small">{text}</BtnSubmitted>
            ) : text === t("common.notStartedTag") ? (
              <BtnStarted size="small">{text}</BtnStarted>
            ) : (
              ""
            )}
          </div>
        )
      },
      {
        dataIndex: "submitted",
        width: "16%",
        render: text => (
          <div>
            <GreyFont>{text}</GreyFont>
          </div>
        )
      },
      {
        dataIndex: "graded",
        width: "15%",
        render: text => (
          <div style={{ paddingLeft: "12px" }}>
            <GreyFont>{text}</GreyFont>
          </div>
        )
      },
      {
        dataIndex: "action",
        width: "14%",
        render: () => (
          <ActionDiv>
            <FlexContainer justifyContent="space-between" style={{ marginLeft: 20, marginRight: 20 }}>
              <Link to={`/author/classboard/${getInfo.key}/${getInfo.classId}`}>
                <Icon src={presentationIcon} alt="Images" />
              </Link>
              <Link to="/author/expressgrader">
                <Icon src={additemsIcon} alt="Images" />
              </Link>
              <div>
                <Icon src={piechartIcon} alt="Images" />
              </div>
            </FlexContainer>
          </ActionDiv>
        )
      }
    ];

    const { assignments } = this.props;
    const expandTableList = [];
    assignments.forEach(expandData => {
      if (parentData.key === expandData[0]._id) {
        expandData.forEach(data => {
          getInfo = convertExpandTableData(data, expandData.length);
          expandTableList.push(getInfo);
        });
      }
    });

    return <ExpandedTable columns={columns} dataSource={expandTableList} pagination={false} class="expandTable" />;
  };

  render() {
    const menu = <ActionMenu />;
    const columns = [
      {
        title: "Assignment Name",
        dataIndex: "name",
        sortDirections: ["descend", "ascend"],
        sorter: true,
        width: "22%",
        render: text => (
          <FlexContainer style={{ marginLeft: 0 }}>
            <div>
              <BtnGreen type="primary" size="small" />
            </div>
            <AssignmentTD>{text}</AssignmentTD>
          </FlexContainer>
        )
      },
      {
        title: "Class",
        dataIndex: "class",
        sortDirections: ["descend", "ascend"],
        sorter: true,
        width: "11%",
        render: () => (
          <ExpandDivdier
            onMouseEnter={() => this.setState({ details: true })}
            onMouseLeave={() => this.setState({ details: false })}
          >
            <IconArrowDown onclick={() => false} src={arrowUpIcon} />1
          </ExpandDivdier>
        )
      },
      {
        title: "Type",
        dataIndex: "type",
        sortDirections: ["descend", "ascend"],
        sorter: true,
        width: "11%",
        render: text => <div>{text}</div>
      },
      {
        title: "Assigned by",
        dataIndex: "assigned",
        sortDirections: ["descend", "ascend"],
        sorter: true,
        width: "15%",
        render: text => <div> {text} </div>
      },
      {
        title: "Status",
        dataIndex: "status",
        sortDirections: ["descend", "ascend"],
        sorter: true,
        width: "12%",
        render: text => <div> {text} </div>
      },
      {
        title: "Submitted",
        dataIndex: "submitted",
        sortDirections: ["descend", "ascend"],
        sorter: true,
        width: "16%",
        render: text => <div> {text} </div>
      },
      {
        title: "Graded",
        dataIndex: "graded",
        sortDirections: ["descend", "ascend"],
        sorter: true,
        width: "14%",
        render: text => <div> {text} </div>
      },
      {
        dataIndex: "action",
        width: "14%",
        render: () => (
          <ActionDiv>
            <Dropdown overlay={menu} placement="bottomCenter" trigger={["click"]}>
              <BtnAction>ACTIONS</BtnAction>
            </Dropdown>
          </ActionDiv>
        )
      }
    ];

    const { assignments } = this.props;
    const { details } = this.state;
    return (
      <Container>
        <TableData
          style={{ width: "auto" }}
          columns={columns}
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
          expandRowByClick={details}
          expandedRowRender={this.expandedRowRender}
          dataSource={assignments.map(data => convertTableData(data))}
        />
      </Container>
    );
  }
}

export default withNamespaces("assignmentCard")(TableList);

TableList.propTypes = {
  assignments: PropTypes.array.isRequired
};
