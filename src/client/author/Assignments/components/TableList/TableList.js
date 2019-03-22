import React, { Component } from "react";
import PropTypes from "prop-types";

import { compose } from "redux";

import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "antd";
import { withNamespaces } from "@edulastic/localization";
import { test } from "@edulastic/constants";

import { FlexContainer } from "@edulastic/common";

import arrowUpIcon from "../../assets/arrow-up.svg";
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
  TypeIcon,
  ExpandDivdier,
  BtnSubmitted,
  BtnStarted,
  ActionDiv,
  GreyFont,
  ExpandedTable,
  IconExpand,
  ActionsWrapper
} from "./styled";

const convertTableData = data => ({
  name: data[0].testName,
  key: data[0]._id,
  class: data[0].className,
  type: data[0].type,
  assigned: "Lorem Ipsum",
  status: "",
  submitted: `${data[0].submittedNumber || 0} of ${data.length}`,
  graded: "1",
  action: "",
  classId: data[0].classId,
  currentAssignment: data[0]
});

const convertExpandTableData = (data, totalNumber) => ({
  name: "",
  key: data.classId,
  class: data.className,
  type: data.type,
  assigned: "Lorem Ipsum",
  status: data.status,
  submitted: `${data.submittedNumber || 0} of ${totalNumber}`,
  graded: "1",
  action: "",
  classId: data.classId,
  testType: data.testType
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
        width: "22%",
        render: () => <GreyFont style={{ width: "253px", display: "block" }} />
      },
      {
        dataIndex: "class",
        width: "11%",
        render: () => <GreyFont />
      },
      {
        dataIndex: "type",
        width: "11%",
        render: (text, row) =>
          row && row.testType === test.type.PRACTICE ? <TypeIcon type="practice">P</TypeIcon> : <TypeIcon>A</TypeIcon>
      },
      {
        dataIndex: "assigned",
        width: "15%",
        render: text => <GreyFont>{text}</GreyFont>
      },
      {
        dataIndex: "status",
        width: "12%",
        render: text =>
          text === "IN PROGRESS" ? (
            <BtnProgress size="small">{text}</BtnProgress>
          ) : text === t("common.submittedTag") ? (
            <BtnSubmitted size="small">{text}</BtnSubmitted>
          ) : text === t("common.notStartedTag") ? (
            <BtnStarted size="small">{text}</BtnStarted>
          ) : (
            ""
          )
      },
      {
        dataIndex: "submitted",
        width: "16%",
        render: text => <GreyFont>{text}</GreyFont>
      },
      {
        dataIndex: "graded",
        width: "14%",
        render: text => <GreyFont>{text}</GreyFont>
      },
      {
        dataIndex: "action",
        width: "14%",
        render: () => (
          <ActionsWrapper>
            <Link to={`/author/classboard/${getInfo.key}/${getInfo.classId}`}>
              <Icon src={presentationIcon} alt="Images" />
            </Link>
            <Link to="/author/expressgrader">
              <Icon src={additemsIcon} alt="Images" />
            </Link>
            <Link to={`/author/standardsBasedReport/${getInfo.key}/${getInfo.classId}`}>
              <Icon src={piechartIcon} alt="Images" />
            </Link>
          </ActionsWrapper>
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
    const { assignments, onOpenReleaseScoreSettings, history, renderFilter } = this.props;
    const { details } = this.state;
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
          <ExpandDivdier>
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
        title: renderFilter(),
        dataIndex: "action",
        width: "14%",
        render: (text, row) => (
          <ActionDiv>
            <Dropdown
              overlay={ActionMenu(onOpenReleaseScoreSettings, row.currentAssignment, history)}
              placement="bottomCenter"
              trigger={["click"]}
            >
              <BtnAction>ACTIONS</BtnAction>
            </Dropdown>
            <IconExpand
              onMouseEnter={() => this.setState({ details: true })}
              onMouseLeave={() => this.setState({ details: false })}
            />
          </ActionDiv>
        )
      }
    ];
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

TableList.propTypes = {
  assignments: PropTypes.array.isRequired,
  renderFilter: PropTypes.func
};

TableList.defaultProps = {
  renderFilter: () => {}
};

const enhance = compose(
  withRouter,
  withNamespaces("assignmentCard")
);

export default enhance(TableList);
