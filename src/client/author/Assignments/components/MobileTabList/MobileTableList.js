/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Collapse, Col, Dropdown } from "antd";
import { FlexContainer } from "@edulastic/common";
import presentationIcon from "../../assets/presentation.svg";
import additemsIcon from "../../assets/add-items.svg";
import piechartIcon from "../../assets/pie-chart.svg";
import ActionMenu from "../ActionMenu/ActionMenu";
import { withNamespaces } from "@edulastic/localization";

import {
  Container,
  BtnAction,
  BtnProgress,
  GrayFont,
  BtnSubmitted,
  SortClassContainer,
  BtnStarted,
  StyledCollapse,
  ClassHeaderCollapse,
  HeaderDiv,
  StyledBox,
  HeaderContent,
  FilterHeader,
  StyledCloseIcon,
  StyledModal,
  StyledTextBox,
  StyledTextFirst,
  StyledTextSecond,
  PanelDiv,
  PanelTableTitle,
  PanelTableName,
  PanelTableValue,
  PanelClass,
  FullRow
} from "./styled";

class MobileTableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      classSort: false,
      modalshow: false
    };
  }

  showModal = () => {
    this.setState({
      modalshow: !this.state.modalshow
    });
  };

  handleClass = e => {
    this.setState({
      classSort: !this.state.classSort
    });
  };
  handleCancel = e => {
    this.setState({
      modalshow: false
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  classCollapsePanel = classData => {
    const { t } = this.props;
    const classPanel = [];
    classData.forEach(data => {
      const CollapsePanel = (
        <div>
          <PanelClass>
            <FlexContainer>
              <FullRow>
                <Col span={16}>
                  <GrayFont>{data.className}</GrayFont>
                </Col>
                <Col span={8}>
                  <SortClassContainer>
                    <img src={presentationIcon} />
                    <img src={additemsIcon} />
                    <img src={piechartIcon} />
                  </SortClassContainer>
                </Col>
              </FullRow>
            </FlexContainer>
          </PanelClass>
          <div>
            {data.status === "IN PROGRESS" ? (
              <BtnProgress size="small">{data.status}</BtnProgress>
            ) : data.status === t("common.submittedTag") ? (
              <BtnSubmitted size="small">{data.status}</BtnSubmitted>
            ) : data.status === t("common.notStartedTag") ? (
              <BtnStarted size="small">{data.status}</BtnStarted>
            ) : (
              ""
            )}
          </div>
        </div>
      );
      classPanel.push(CollapsePanel);
    });
    return classPanel;
  };
  CollapsePanel = AssignmentData => {
    const { t, windowWidth, windowHeight } = this.props;
    const menu = <ActionMenu />;
    var i = 0;
    const Panel = [];
    AssignmentData.forEach(assignment => {
      const panaelHeader = (
        <HeaderDiv>
          <StyledBox />
          <StyledTextBox>
            <StyledTextFirst>ASSESSMENT NAME</StyledTextFirst>
            <StyledTextSecond>{assignment[0].testName}</StyledTextSecond>
          </StyledTextBox>
        </HeaderDiv>
      );
      const classHeader = (
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={this.handleClass}>
          <p style={{ color: "#00b0ff", fontSize: "1.2em" }}>Class</p>
          <p>
            {this.state.classSort ? (
              <Icon type="down" style={{ color: "#00b0ff" }} />
            ) : (
              <Icon type="up" style={{ color: "#00b0ff" }} />
            )}
          </p>
        </div>
      );
      const panelPara = (
        <div>
          <PanelDiv>
            <PanelTableTitle>
              <PanelTableName>TYPE</PanelTableName>
              <PanelTableValue>Assigned</PanelTableValue>
            </PanelTableTitle>
            <PanelTableTitle>
              <PanelTableName>ASSIGNED BY</PanelTableName>
              <PanelTableValue>Lorem Ispum</PanelTableValue>
            </PanelTableTitle>
          </PanelDiv>
          <PanelDiv>
            <PanelTableTitle>
              <PanelTableName>SUBMITTED</PanelTableName>
              <PanelTableValue>
                {assignment.length} of {assignment.length}
              </PanelTableValue>
            </PanelTableTitle>
            <PanelTableTitle>
              <PanelTableName>GRADED</PanelTableName>
              <PanelTableValue>1</PanelTableValue>
            </PanelTableTitle>
          </PanelDiv>

          <div style={{ height: "auto" }}>
            <ClassHeaderCollapse accordion>
              <Collapse.Panel header={classHeader} showArrow={false}>
                {this.classCollapsePanel(assignment)}
              </Collapse.Panel>
            </ClassHeaderCollapse>
          </div>
          <div style={{ height: "auto", marginTop: "15px" }}>
            {windowWidth < "770" ? (
              <div>
                <BtnAction onClick={this.showModal}>ACTIONS</BtnAction>
                <StyledModal
                  footer={false}
                  closable={false}
                  visible={this.state.modalshow}
                  bodyStyle={{ height: windowHeight, width: windowWidth }}
                >
                  <HeaderContent>
                    <FilterHeader>Actions</FilterHeader>
                    <StyledCloseIcon onClick={this.handleCancel} type="close" />
                  </HeaderContent>
                  {menu}
                </StyledModal>
              </div>
            ) : (
              <div>
                <Dropdown overlay={menu} placement="bottomCenter" trigger={["click"]}>
                  <BtnAction>ACTIONS</BtnAction>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      );
      const CollapsePanel = (
        <Collapse.Panel header={panaelHeader} showArrow={false} key={i}>
          {panelPara}
        </Collapse.Panel>
      );
      i++;
      Panel.push(CollapsePanel);
    });
    return Panel;
  };

  render() {
    const { assignments, windowWidth, windowHeight } = this.props;
    return (
      <Container>
        <StyledCollapse accordion>{this.CollapsePanel(assignments)}</StyledCollapse>
      </Container>
    );
  }
}
MobileTableList.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
};
export default withNamespaces("assignmentCard")(MobileTableList);
