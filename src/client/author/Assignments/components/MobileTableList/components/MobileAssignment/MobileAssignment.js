import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";

import presentationIcon from "../../../../assets/presentation.svg";
import additemsIcon from "../../../../assets/add-items.svg";
import piechartIcon from "../../../../assets/pie-chart.svg";
import ActionMenu from "../../../ActionMenu/ActionMenu";
import { TypeIcon, IconExpand, Icon } from "../../../TableList/styled";
import AssignmentDetails from "../AssignmentDetails/AssignmentDetails";
import {
  AssignmentThumbnail,
  AssignmentWrapper,
  AssignmentTitle,
  AssignmentDetailsWrapper,
  ExpandedRow,
  ExpandButton,
  AssignmentStatus,
  AssignmentNavigation,
  ExpandRowWrapper,
  ExpandRowTopContent,
  ExpandRowTopContentItem,
  MobileActionButton
} from "./styled";

export default class MobileAssignment extends React.Component {
  static propTypes = {
    assignment: PropTypes.object.isRequired,
    onOpenReleaseScoreSettings: PropTypes.func.isRequired
  };

  state = {
    expandItems: false,
    enableExpandAnimation: false
  };

  componentDidMount() {
    this.setState({ enableExpandAnimation: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { expandItems } = this.state;
    const { assignment } = this.props;
    return nextProps.assignment !== assignment || nextState.expandItems !== expandItems;
  }

  handleToggleExpandItems = () => this.setState(({ expandItems }) => ({ expandItems: !expandItems }));

  static renderExpandRowIcons(item) {
    const itemLink = `${item._id}/${item.classId}`;

    return (
      <AssignmentNavigation>
        <Link to={`/author/classboard/${itemLink}`}>
          <Icon src={presentationIcon} alt="Images" />
        </Link>
        <Link to="/author/expressgrader">
          <Icon src={additemsIcon} alt="Images" />
        </Link>
        <Link to={`/author/standardsBasedReport/${itemLink}`}>
          <Icon src={piechartIcon} alt="Images" />
        </Link>
      </AssignmentNavigation>
    );
  }

  render() {
    const { expandItems, enableExpandAnimation } = this.state;
    const { assignment, onOpenReleaseScoreSettings } = this.props;
    const [defaultAssignment] = assignment;

    const { testName, className, type, assigned, status, submitted, graded } = defaultAssignment;

    const submittedValue = `${submitted || 0} of ${assignment.length}`;
    const expandedRowsProps = {
      animationEnabled: enableExpandAnimation,
      expanded: expandItems
    };

    return (
      <AssignmentWrapper>
        <AssignmentThumbnail />
        <AssignmentTitle>{testName}</AssignmentTitle>
        <AssignmentDetailsWrapper>
          <AssignmentDetails title="Class" value={className || "1"} />
          <AssignmentDetails title="Type" value={type || "Assessment"} />
        </AssignmentDetailsWrapper>
        <ExpandedRow>
          {assignment.map((item, key) => (
            <ExpandRowWrapper key={`classname-${key}`} {...expandedRowsProps}>
              <ExpandRowTopContent>
                <ExpandRowTopContentItem>{item.className || "Class 1"}</ExpandRowTopContentItem>
                <ExpandRowTopContentItem>
                  <TypeIcon>A</TypeIcon>
                </ExpandRowTopContentItem>
              </ExpandRowTopContent>
            </ExpandRowWrapper>
          ))}
        </ExpandedRow>
        <AssignmentDetailsWrapper>
          <AssignmentDetails title="Assigned by" value={assigned} />
          <AssignmentDetails title="Status" value={status || "Not Started"} />
        </AssignmentDetailsWrapper>
        <ExpandedRow>
          {assignment.map((item, key) => (
            <ExpandRowWrapper key={`status-${key}`} {...expandedRowsProps}>
              <ExpandRowTopContent>
                <ExpandRowTopContentItem>{item.assigned || ""}</ExpandRowTopContentItem>
                <ExpandRowTopContentItem>
                  <AssignmentStatus type={item.status}>{item.status || "NOT STARTED"}</AssignmentStatus>
                </ExpandRowTopContentItem>
              </ExpandRowTopContent>
            </ExpandRowWrapper>
          ))}
        </ExpandedRow>
        <AssignmentDetailsWrapper>
          <AssignmentDetails title="Submitted" value={submittedValue} />
          <AssignmentDetails title="Graded" value={graded || 0} />
        </AssignmentDetailsWrapper>
        <ExpandedRow>
          {assignment.map((item, key) => (
            <ExpandRowWrapper key={`graded-${key}`} {...expandedRowsProps} doubleRow>
              <ExpandRowTopContent>
                <ExpandRowTopContentItem>{`${item.submitted || 0} of ${assignment.length}`}</ExpandRowTopContentItem>
                <ExpandRowTopContentItem>{item.graded || 0}</ExpandRowTopContentItem>
              </ExpandRowTopContent>
              {MobileAssignment.renderExpandRowIcons(item)}
            </ExpandRowWrapper>
          ))}
        </ExpandedRow>
        <Dropdown
          overlay={ActionMenu(onOpenReleaseScoreSettings, assignment[0])}
          placement="topCenter"
          trigger={["click"]}
        >
          <MobileActionButton>Actions</MobileActionButton>
        </Dropdown>
        <ExpandButton expanded={expandItems} onClick={this.handleToggleExpandItems}>
          <span>{expandItems ? "Less Options" : "More Options"}</span>
          <IconExpand />
        </ExpandButton>
      </AssignmentWrapper>
    );
  }
}
